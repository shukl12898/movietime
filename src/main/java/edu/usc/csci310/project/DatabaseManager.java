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
            "username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)";

    Connection c;

    /**
     * Initializer for the manager class. Creates necessary tables
     * if they do not already exist.
     * @throws Exception sqle if the database could not be created.
     */
    public DatabaseManager() throws Exception {
        try {
            c = DriverManager.getConnection(SQLITE_CONNECTION_STRING);
            Statement statement = c.createStatement();
            statement.executeUpdate(USERS_TABLE);
        }
        catch (SQLException sqle) {
            System.err.println(sqle);
            throw new Exception("Could not create the Database");
        }
    }

    /**
     * Drops all tables created. Helper function.
     */
    public void dropAllTables() throws Exception {
        PreparedStatement pst = c.prepareStatement("DROP TABLE IF EXISTS users");
        pst.executeUpdate();
    }

    /**
     * Inserts a new user into the necessary tables.
     * Automatically assigns a user id for the entry.
     *
     * @param username username (encrypted).
     * @param password password (encrypted).
     */
    private void insertIntoUser(String username, String password) {
        try {
            PreparedStatement pst = c.prepareStatement("insert into users (username, password) values(?,?)");
            pst.setString(1, username);
            pst.setString(2, password);
            pst.executeUpdate();
        } catch (SQLException sqle) {
            System.out.println(sqle);
            System.err.println("Could not set new user.");

        }
    }

    /**
     * Returns a list of usernames.
     *
     * @param limit of rows to return.
     * @return
     */
    public List<String> getAllUsers(int limit) {
        List<String> userNames = new ArrayList<>();
        try {
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

        try {
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

    public UserModel getUser(String username, String password) throws Exception {
        PreparedStatement pst = c.prepareStatement("SELECT user_id from users " +
                "WHERE username = ? AND password = ? ");
        pst.setString(1, username);
        pst.setString(2, password);
        ResultSet resultSet = pst.executeQuery();
        if (resultSet.next()) {
            int userId = resultSet.getInt("user_id");
            UserModel u = new UserModel(userId, username);
            return u;
        } else {
            throw new Exception("No user with that username and password.");
        }
    }

    public UserModel createNewUser(String username, String password, String name) throws Exception
    {
        insertIntoUser(username, password);
        UserModel u = getUser(username, password);
        u.setDisplayName(name);
        return u;
    }



}
