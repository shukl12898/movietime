package edu.usc.csci310.project;

import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class WatchlistDatabaseManagerTest {
    /*
    //@Test
    void addToWatchlist() {

        String SQLITE_CONNECTION_STRING = "jdbc:sqlite:platform.db";
        Connection c = mock(Connection.class);
        Connection conn = mock(Connection.class);
        ResultSet rs = mock(ResultSet.class);
        PreparedStatement pst = mock(PreparedStatement.class);

        try {
            when(conn.prepareStatement(anyString())).thenReturn(pst);
            when(conn.createStatement()).thenReturn();
            when(rs.next()).thenReturn(true).thenReturn(false);
            when(rs.getInt(anyString())).thenThrow(SQLException.class);

        ArrayList<String> moviesIn1 = new ArrayList<String>();
//        moviesIn1.add("Fight");
//        moviesIn1.add("Fought");
        WatchlistModel w1 = new WatchlistModel(1, "Action", moviesIn1, 1);

        ArrayList<String> moviesIn2 = new ArrayList<String>();
//        moviesIn1.add("Funny");
//        moviesIn1.add("Fun");
        WatchlistModel w2 = new WatchlistModel(1, "Comedy", moviesIn2, 1);

        ArrayList<WatchlistModel> testList = new ArrayList<WatchlistModel>();
        testList.add(w1);
        testList.add(w2);

        try {
            WatchlistDatabaseManager wdb = new WatchlistDatabaseManager(c);
            wdb.addToWatchlist(1, "Action", "Fight", 1);
            wdb.addToWatchlist(1, "Action", "Fought", 1);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        ArrayList<WatchlistModel> list = getAllUserWatchlists();

        list.assertEquals(testList);
    }
    @Test
    void getAllUserWatchlists() {
        ArrayList<WatchlistModel> testList =
        try {
            WatchlistDatabaseManager wdb = new WatchlistDatabaseManager();
            wdb.addToWatchlist();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        ArrayList<WatchlistModel> list = getAllUserWatchlists();


        assertEquals();
    }

    @Test
    void getWatchlist() {

    }
    */
}