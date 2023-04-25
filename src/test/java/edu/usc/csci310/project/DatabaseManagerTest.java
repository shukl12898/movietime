package edu.usc.csci310.project;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

class DatabaseManagerTest {

    private static final String SQLITE_CONNECTION_STRING_TEST = "jdbc:sqlite:src/main/resources/test.db";
    DatabaseManager db;
    @BeforeEach
    void setDB() throws Exception {
        db = new DatabaseManager(DriverManager.getConnection(SQLITE_CONNECTION_STRING_TEST));
    }
    @AfterEach
    void tearDown() {
        db.dropAllTables();
    }

    @Test
    void testWatchListsOneUser() {
        db.createNewUser("tommytrojan", "traveler", "Tommy");
        UserModel u = db.getUser("tommytrojan", "traveler");
        ArrayList<ListModel> l = db.getListsForUser(u.getUser_id());

        assertTrue(l.isEmpty());

        int listOne = db.newWatchlist("Shrek Films", u.getUser_id(), true);
        l = db.getListsForUser(u.getUser_id());
        assertEquals(1, l.size());

        int listExists = db.newWatchlist("Shrek Films", u.getUser_id(), true);
        l = db.getListsForUser(u.getUser_id());
        assertEquals(1, l.size());

        int listTwo = db.newWatchlist("Toy Story Films", u.getUser_id(), true);

        db.insertIntoWatchlist(111, listOne);
        db.insertIntoWatchlist(222, listOne);
        db.insertIntoWatchlist(333, listOne);

        l = db.getListsForUser(u.getUser_id());
        assertEquals(2, l.size());

        ListModel shrekList = l.get(0);
        assertEquals(Optional.of(111), shrekList.getMovies().get(0));
        assertEquals(Optional.of(222), shrekList.getMovies().get(1));
        assertEquals(Optional.of(333), shrekList.getMovies().get(2));

        //Get Watchlist
        int shrekId = db.getWatchList("Shrek Films");
        assertEquals(1, shrekId);

        //Renaming watchlist
        db.renameList(db.getWatchList("Shrek Films"), "Shrek Films Renamed");
        shrekId = db.getWatchList("Shrek Films Renamed");
        assertEquals(1, shrekId);

        //Removing movies from Watchlist
        l = db.getListsForUser(u.getUser_id());
        shrekList = l.get(0);
        assertEquals(3, shrekList.getMovies().size());
        db.deleteFromWatchlist(111, shrekId);
        l = db.getListsForUser(u.getUser_id());
        shrekList = l.get(0);
        assertEquals(2, shrekList.getMovies().size());

        //Delete watchlist
        db.deleteWatchlist(listOne);
        l = db.getListsForUser(u.getUser_id());
        assertEquals(1, l.size());

    }

    @Test
    void testWatchListsTwoUsers() {
        db.createNewUser("tommytrojan", "traveler", "Tommy");
        db.createNewUser("tirebiter", "traveler", "Tirebiter");
        UserModel tommy = db.getUser("tommytrojan", "traveler");
        UserModel tirebiter = db.getUser("tirebiter", "traveler");

        assertTrue(db.getListsForUser(tommy.getUser_id()).isEmpty());
        assertTrue(db.getListsForUser(tirebiter.getUser_id()).isEmpty());

        db.newWatchlist("USC Movies", tommy.getUser_id(), true);
        db.newWatchlist("LA Movies", tommy.getUser_id(), true);
        db.newWatchlist("Favorite Movies", tommy.getUser_id(), true);

        assertEquals(3, db.getListsForUser(tommy.getUser_id()).size());
        assertTrue(db.getListsForUser(tirebiter.getUser_id()).isEmpty());

    }

    @Test
    void insertException() throws Exception {
        Connection conn = mock(Connection.class);
        Statement st = mock(Statement.class);
        ResultSet rs = mock(ResultSet.class);
        PreparedStatement pst = mock(PreparedStatement.class);

        when(conn.prepareStatement(anyString())).thenReturn(pst);
        when(conn.createStatement()).thenReturn(st);
        when(st.executeQuery(anyString())).thenReturn(rs);
        when(rs.next()).thenReturn(true).thenReturn(false);
        when(rs.getInt(anyString())).thenThrow(SQLException.class);

        DatabaseManager testDB = new DatabaseManager(conn);
        //String response = testDB.insertIntoWatchlist("")
        //assertEquals("it was not possible to eat at this time", response);
    }

}
