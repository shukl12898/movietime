package edu.usc.csci310.project;
import org.apache.catalina.User;

import java.io.File;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * DatabaseManager class for managing database on the web app.
 * Using SQLite, a database, "platform.db" is created in the path SQLITE_CONNECTION_STRING.
 */
public class DatabaseManager {
    private static final String SQLITE_CONNECTION_STRING = "jdbc:sqlite:src/main/resources/platform.db";
    private static final String USERS_TABLE = "CREATE TABLE IF NOT EXISTS " +
            "users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL)";
    private static Connection c;

    private static final String WATCHLIST_USER_TABLE = "CREATE TABLE IF NOT EXISTS " +
            "watchlists (watchlist_id INTEGER PRIMARY KEY AUTOINCREMENT, list_name VARCHAR(255) NOT NULL, " +
            " user_id INTEGER NOT NULL, isPrivate BIT NOT NULL)";
    private static final String WATCHLIST_CONTENT = "CREATE TABLE IF NOT EXISTS " +
            "contentsOfLists (watchlist_id INTEGER, " + "movie_id INTEGER NOT NULL, " +
            "FOREIGN KEY (watchlist_id) REFERENCES watchlists(watchlist_id) ON DELETE CASCADE)";

    private static final String AUTHENTICATION = "CREATE TABLE IF NOT EXISTS " +
            "auth (user_id INTEGER, " + "attempts INTEGER, token VARCHAR(255), " +
            "FOREIGN KEY (user_id) REFERENCES users(user_id))";

    /**
     * Initializer for the manager class. Creates necessary tables
     * if they do not already exist.
     * @throws Exception sqle if the database could not be created.
     */
    public DatabaseManager(Connection conn) throws Exception {
        //try (Connection c = DriverManager.getConnection(SQLITE_CONNECTION_STRING)){
        try (Connection c = conn) {
            Statement statement = c.createStatement();
            statement.executeUpdate(USERS_TABLE);
            statement.executeUpdate(WATCHLIST_USER_TABLE);
            statement.executeUpdate(WATCHLIST_CONTENT);
        } catch (SQLException sqle) {
            System.err.println(sqle);
            throw new Exception("Could not create the Database");
        }
    }

    public DatabaseManager() throws Exception {
        try (Connection c = DriverManager.getConnection(SQLITE_CONNECTION_STRING)){
            Statement statement = c.createStatement();
            statement.executeUpdate(USERS_TABLE);
            statement.executeUpdate(WATCHLIST_USER_TABLE);
            statement.executeUpdate(WATCHLIST_CONTENT);
        } catch (SQLException sqle) {
            System.err.println(sqle);
            throw new Exception("Could not create the Database");
        }
    }

    /**
     * Drops all tables created. Helper function.
     */
    public void dropAllTables() {
        try (Connection c = DriverManager.getConnection(SQLITE_CONNECTION_STRING)){
            PreparedStatement pst = c.prepareStatement("DROP TABLE IF EXISTS users");
            pst.executeUpdate();
            pst = c.prepareStatement("DROP TABLE IF EXISTS watchlists");
            pst.executeUpdate();
            pst = c.prepareStatement("DROP TABLE IF EXISTS contentsOfLists");
            pst.executeUpdate();
        } catch (SQLException sqle) {
            System.out.println(sqle);
            System.err.println("Could not drop tables.");
        }
    }
    
     /**
     * Inserts a new user into the necessary tables.
     * Automatically assigns a user id for the entry.
     *
     * @param username username (encrypted).
     * @param password password (encrypted).
     */
    public void insertIntoUser(String username, String password, String displayName) {
        try (Connection c = DriverManager.getConnection(SQLITE_CONNECTION_STRING)){
            PreparedStatement pst = c.prepareStatement("insert into users (username, password, name) values(?,?,?)");
            pst.setString(1, username);
            pst.setString(2, password);
            pst.setString(3, displayName);
            pst.executeUpdate();
        } catch (SQLException sqle) {
            System.out.println(sqle);
            System.err.println("Could not set new user.");
        }
    }

    /**
     * Inserts a new user into the necessary tables.
     * Automatically assigns a user id for the entry.
     *
     * @param username username (encrypted).
     * @param password password (encrypted).
     */
     public UserModel createNewUser(String username, String password, String name){
        insertIntoUser(username, password, name);
        UserModel u = getUser(username, password);
        u.setDisplayName(name);
        return u;
    }

    /**
     * Returns a list of usernames.
     *
     * @param limit of rows to return.
     * @return
     */
    public List<String> getAllUsers(int limit) {
        List<String> userNames = new ArrayList<>();
        try (Connection c = DriverManager.getConnection(SQLITE_CONNECTION_STRING)) {
            PreparedStatement pst = c.prepareStatement("SELECT * from users LIMIT ?");
            pst.setInt(1, limit);
            ResultSet resultSet = pst.executeQuery();
            int inserted = 0;
            while (resultSet.next() && inserted <= limit) {
                int userId = resultSet.getInt("user_id");
                String username = resultSet.getString("username");
                String password = resultSet.getString("password");
                System.out.println(userId + " -> " + username + ", " + password);
                userNames.add(username);
                inserted++;
            }
        } catch (Exception e){
            System.out.println("Error retrieving all users.");
        }
        return userNames;
    }

    /**
     * Counts number of entries for a given table.
     * @param tableName of the table to search for.
     * @return
     */
    public int getRowCount(String tableName) {
        String table;
        String attribute;
        if (tableName.contains("user")) {
            table = "users";
            attribute = "user_id";
        } else {
            return 0;
        }

        try (Connection c = DriverManager.getConnection(SQLITE_CONNECTION_STRING)){
            PreparedStatement pst = c.prepareStatement("SELECT COUNT(?) FROM ?");
            pst.setString(1, attribute);
            pst.setString(2, table);
            ResultSet resultSet = pst.executeQuery();
            return resultSet.getInt(0);
        } catch (Exception e) {
            System.out.println(e);
            System.out.println("Error counting entries.");
        }
        return -1;
    }

    public UserModel getUser(String username, String password) {
        try (Connection c = DriverManager.getConnection(SQLITE_CONNECTION_STRING)){
            PreparedStatement pst = c.prepareStatement("SELECT user_id, name from users " +
                    "WHERE username = ? AND password = ? ");
            pst.setString(1, username);
            pst.setString(2, password);
            ResultSet resultSet = pst.executeQuery();
            if (resultSet.next()) {
                int userId = resultSet.getInt("user_id");
                String name = resultSet.getString("name");
                UserModel u = new UserModel(userId, username);
                u.setDisplayName(name);
                return u;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    /**
     * Retrieves all lists for a given user.
     * first, gets all the watchlists for the userId.
     * Then, in an inner loop, queries for the movies in
     * a certain watchlist and builds a list of ListModel(s).
     *
     * If the list is empty, there were no watchlists stored for the user.
     * @param userId
     * @return
     */
    public ArrayList<ListModel> getListsForUser(int userId) {

        ArrayList<ListModel> l = new ArrayList<>();
        try (Connection c = DriverManager.getConnection(SQLITE_CONNECTION_STRING)) {

            String queryForLists = "SELECT * FROM watchlists WHERE user_id = ?";
            PreparedStatement pst = c.prepareStatement(queryForLists);
            pst.setInt(1, userId);
            ResultSet listIdsForUser = pst.executeQuery();

            while (listIdsForUser.next()) {

                String queryForMovies = "SELECT * FROM contentsOfLists WHERE watchlist_id = ? ";
                PreparedStatement pst2 = c.prepareStatement(queryForMovies);
                pst2.setInt(1, listIdsForUser.getInt(1));
                ResultSet moviesInList = pst2.executeQuery();

                ListModel curr = new ListModel();
                curr.setListId(listIdsForUser.getInt("watchlist_id"));
                curr.setListName(listIdsForUser.getString("list_name"));
                curr.setUserId(listIdsForUser.getInt("user_id"));
                curr.setPrivate(listIdsForUser.getBoolean("isPrivate"));
                curr.setMovies(new ArrayList<>());
                while (moviesInList.next()) {
                    ArrayList<Integer> temp = curr.getMovies();
                    temp.add(moviesInList.getInt("movie_id"));
                    curr.setMovies(temp);
                } // end while
                l.add(curr);
            } // end while
        } catch (Exception e) {
            System.out.println("Error in getListsForUses(): "+e.toString());
        }
        return l;
    } // end getListsForUser

    /**
     * Creates a new watchlist and assigns it to a given user.
     * checks for duplicates. therefore, if a list with the
     * same name exists for the user, then the function will
     * return -1. Otherwise, returns the watchlist_id of this
     * new watchlist. Case sensitive.
     * @param listName
     * @param forUser
     * @return
     */
    public int newWatchlist(String listName, int forUser, boolean isPrivate) {
        int watchlistId = -1;
        try (Connection c = DriverManager.getConnection(SQLITE_CONNECTION_STRING)){
            PreparedStatement queryForId = c.prepareStatement("SELECT watchlist_id FROM watchlists WHERE " +
                    "user_id = ? and list_name = ? ");
            queryForId.setInt(1, forUser);
            queryForId.setString(2, listName);
            ResultSet rs = queryForId.executeQuery();

            // a list under "listName" exists forUser
            if (rs.next()) {
                return -1;
            }

            PreparedStatement pst = c.prepareStatement("insert into watchlists (list_name, user_id, isPrivate) " +
                    "values(?,?,?)");
            pst.setString(1, listName);
            pst.setInt(2, forUser);
            pst.setBoolean(3, isPrivate);
            pst.executeUpdate();

            rs = queryForId.executeQuery();
            while (rs.next()) {
                watchlistId = rs.getInt("watchlist_id");
                break;
            }
        } catch (SQLException sqle) {
            System.out.println(sqle);
            System.err.println("Could not create new list.");
        }
        return watchlistId;
    }

    /**
     * Inserts a given movieId into an existing watchlist,
     * identified by a watchlistId. Assumes the list exists.
     * Will NOT update or throw an error if otherwise.
     *
     * Use newWatchList() to create a new watchlist
     * or getWatchList(String name) or getWatchlist (int id) to
     * retrieve one.
     *
     * returns a message in the event the movie exists already.
     * @param movieId
     * @param watchlistId
     * @return
     */
    public String insertIntoWatchlist(int movieId, int watchlistId) {

        try (Connection c = DriverManager.getConnection(SQLITE_CONNECTION_STRING)){

            PreparedStatement pst = c.prepareStatement("insert into contentsOfLists (watchlist_id, movie_id) " +
                    "values(?,?)");
            pst.setInt(1, watchlistId);
            pst.setInt(2, movieId);
            pst.executeUpdate();

        } catch (Exception e) {
            System.out.println(e);
            return "Error " + e.toString();
        }
        return "SUCCESS";

    }

    public int getWatchList(String listName) {
        int id = -1;

        try (Connection c = DriverManager.getConnection(SQLITE_CONNECTION_STRING)){
            PreparedStatement queryForId = c.prepareStatement("SELECT watchlist_id FROM watchlists WHERE " +
                    "list_name = ? ");
            queryForId.setString(1, listName);
            ResultSet rs = queryForId.executeQuery();

            if (rs.next()) {
                return rs.getInt("watchlist_id");
            }
        } catch (SQLException sqle) {
            System.out.println(sqle);
            System.err.println("Such list does not exist.");
        }

        return id;
    }

    public void deleteWatchlist(int watchlistId) {
        try (Connection conn = DriverManager.getConnection(SQLITE_CONNECTION_STRING)) {
            String query = "DELETE FROM watchlists WHERE watchlist_id = ?";
            PreparedStatement pstmt = conn.prepareStatement(query);
            pstmt.setInt(1, watchlistId);
            pstmt.executeUpdate();
            String query2 = "DELETE FROM contentsOfLists WHERE watchlist_id = ?";
            PreparedStatement pst2 = conn.prepareStatement(query2);
            pst2.setInt(1, watchlistId);
            pst2.executeUpdate();
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
    }

    public void deleteFromWatchlist(int targetMovie, int watchlistId) {
        try (Connection conn = DriverManager.getConnection(SQLITE_CONNECTION_STRING)) {
            String query2 = "DELETE FROM contentsOfLists WHERE watchlist_id = ? and movie_id = ?";
            PreparedStatement pst2 = conn.prepareStatement(query2);
            pst2.setInt(1, watchlistId);
            pst2.setInt(2, targetMovie);
            pst2.executeUpdate();
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
    }

    public void renameList(int watchlistId, String newName) {

        try (Connection conn = DriverManager.getConnection(SQLITE_CONNECTION_STRING)) {
            String query2 = "UPDATE watchlists " +
                    "SET list_name = ? " +
                    "WHERE watchlist_id = ?";
            PreparedStatement pst2 = conn.prepareStatement(query2);
            pst2.setString(1, newName);
            pst2.setInt(2, watchlistId);
            pst2.executeUpdate();
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }

    }



}

