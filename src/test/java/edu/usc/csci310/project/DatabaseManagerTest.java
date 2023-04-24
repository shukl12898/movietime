package edu.usc.csci310.project;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

class DatabaseManagerTest {

    DatabaseManager db;
    @BeforeEach
    void setDB() throws Exception {
        db = new DatabaseManager();
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

        int listTwo = db.newWatchlist("Toy Story Films", u.getUser_id(), true);

        db.insertIntoWatchlist(111, listOne);
        db.insertIntoWatchlist(222, listOne);
        db.insertIntoWatchlist(333, listOne);

        l = db.getListsForUser(u.getUser_id());
        assertEquals(2, l.size());

        ListModel shrekList = l.get(0);
        assertEquals(111, shrekList.getMovies().get(0));
        assertEquals(222, shrekList.getMovies().get(1));
        assertEquals(333, shrekList.getMovies().get(2));

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
    public void insertIntoList() {
        db.createNewUser("tommytrojan", "traveler", "Tommy");
        UserModel u = db.getUser("tommytrojan", "traveler");
        ArrayList<ListModel> l = db.getListsForUser(u.getUser_id());

        assertTrue(l.isEmpty());

        //int listOne = db.newWatchlist("Shrek Films", u.getUser_id());
        l = db.getListsForUser(u.getUser_id());
        assertEquals(1, l.size());
    }
}
