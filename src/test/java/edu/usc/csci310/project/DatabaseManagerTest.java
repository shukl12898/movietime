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
        db.dropAllTables();
        db.setUp();
    }
    @AfterEach
    void tearDown() {
        db.dropAllTables();
    }

    @Test
    void testUserCreation() {
        db.createNewUser("tommytrojan", "traveler", "Tommy");
        db.createNewUser("tommytrojan1", "traveler", "Tommy 1");
        db.createNewUser("tommytrojan2", "traveler", "Tommy 2");
        db.createNewUser("tommytrojan3", "traveler", "Tommy 3");

        List<UserModel> userNames = db.getAllUsers(10);

        assertEquals(4, userNames.size());

        assertEquals(null, db.createNewUser("tommytrojan", "traveler", "Tommy"));
    }

    @Test
    void userLogin() throws Exception {

        db.createNewUser("tommytrojan", "traveler", "Tommy");
        db.createNewUser("tommytrojan1", "traveler", "Tommy 1");

        assertNotEquals(db.getUser("tommytrojan", "traveler"),
                db.getUser("tommytrojan1", "traveler"));

        assertThrows(Exception.class, ()->db.getUser("tommytrojan", "Traveler"));
        assertThrows(Exception.class, ()->db.getUser("traveler", "tommy"));

    }
    @Test
    void testWatchListsOneUser() throws Exception {
        db.createNewUser("tommytrojan", "traveler", "Tommy");

        UserModel u = db.getUser("tommytrojan", "traveler");
        ArrayList<ListModel> l = db.getListsForUser(u.getUser_id());

        assertTrue(l.isEmpty());

        int listOne = db.newWatchlist("Shrek Films", u.getUser_id(), false);
        l = db.getListsForUser(u.getUser_id());
        assertEquals(1, l.size());

        int listTwo = db.newWatchlist("Toy Story Films", u.getUser_id(), false);

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
    void testWatchListsTwoUsers() throws Exception {
        db.createNewUser("tommytrojan", "traveler", "Tommy");
        db.createNewUser("tirebiter", "traveler", "Tirebiter");

        UserModel tommy = db.getUser("tommytrojan", "traveler");
        UserModel tirebiter = db.getUser("tirebiter", "traveler");

        assertTrue(db.getListsForUser(tommy.getUser_id()).isEmpty());
        assertTrue(db.getListsForUser(tirebiter.getUser_id()).isEmpty());

        db.newWatchlist("USC Movies", tommy.getUser_id(), false);
        db.newWatchlist("LA Movies", tommy.getUser_id(),false);
        db.newWatchlist("Favorite Movies", tommy.getUser_id(), false);

        assertEquals(3, db.getListsForUser(tommy.getUser_id()).size());
        assertTrue(db.getListsForUser(tirebiter.getUser_id()).isEmpty());
    }

    @Test
    void renameWatchlistTest() throws Exception {
        db.createNewUser("tommytrojan", "traveler", "Tommy");
        UserModel tommy = db.getUser("tommytrojan", "traveler");
        int watchlistId = db.newWatchlist("USC Movies", tommy.getUser_id(), false);

        assertTrue(db.renameList(watchlistId, "UCLA Movies").contains("SUCCESS"));
        int temp = db.getWatchList("USC Movies");
        assertEquals(-1, temp);
        temp = db.getWatchList("UCLA Movies");
        assertEquals(temp, watchlistId);

        int secondList = db.newWatchlist("USC Movies", tommy.getUser_id(), false);
        assertTrue(db.renameList(secondList, "UCLA Movies").contains("exists"));
    }

    @Test
    void testDeleteMovie() throws Exception {
        db.createNewUser("tommytrojan", "traveler", "Tommy");
        UserModel tommy = db.getUser("tommytrojan", "traveler");
        int watchlistId = db.newWatchlist("USC Movies", tommy.getUser_id(), false);

        String message = db.insertIntoWatchlist(1, watchlistId);
        assertTrue(message.contains("SUCCESS"));
        List<ListModel> tommysLists = db.getListsForUser(tommy.getUser_id());
        assertEquals(1, tommysLists.get(0).getMovies().get(0));
        db.deleteFromWatchlist(1, watchlistId);

        tommysLists = db.getListsForUser(tommy.getUser_id());
        assertTrue(tommysLists.get(0).getMovies().isEmpty());

    }

    @Test
    void testPublicPrivate() throws Exception {
        db.createNewUser("tommytrojan", "traveler", "Tommy");

        UserModel u = db.getUser("tommytrojan", "traveler");
        int listOne = db.newWatchlist("Shrek Films", u.getUser_id(), true);
        int listTwo = db.newWatchlist("Toy Story Films", u.getUser_id(), false);
        int listThree = db.newWatchlist("Animated Films", u.getUser_id(), false);
        int listFour = db.newWatchlist("USC Favorites", u.getUser_id(), true);

        ArrayList<ListModel> l = db.getListsForUser(u.getUser_id());
        assertEquals(4, l.size());

        ArrayList<ListModel> publicLists = db.getPublicListsForUser(u.getUser_id());
        assertEquals(2, publicLists.size());

        String two = publicLists.get(0).getListName();
        String three = publicLists.get(1).getListName();

        assertEquals(two, "Toy Story Films");
        assertEquals(three, "Animated Films");
    }

    @Test
    void testPublicUsers() throws Exception {

        db.createNewUser("tommytrojan", "traveler", "Tommy");
        db.createNewUser("tommytrojan1", "traveler", "Tommy");
        db.createNewUser("tommytrojan3", "traveler", "Tommy");
        db.createNewUser("tommytrojan4", "traveler", "Tommy");
        db.createNewUser("tommytrojan5", "traveler", "Tommy");

        List<UserModel> users = db.getAllUsers(10);
    }

    @Test
    void combineLists() throws Exception {
        UserModel tommy = db.createNewUser("tommytrojan", "traveler", "Tommy");
        UserModel tommy2 = db.createNewUser("tommytrojan1", "traveler", "Tommy");

        int watchlist1 = db.newWatchlist("Tommy's List", tommy.getUser_id(), false);
        int watchlist2 = db.newWatchlist("Trojan's List", tommy2.getUser_id(), false);

        db.insertIntoWatchlist(111, watchlist1);
        db.insertIntoWatchlist(222, watchlist1);
        db.insertIntoWatchlist(333, watchlist1);

        db.insertIntoWatchlist(444, watchlist2);
        db.insertIntoWatchlist(555, watchlist2);
        db.insertIntoWatchlist(666, watchlist2);

        assertEquals(1, db.getListsForUser(tommy.getUser_id()).size());
        assertEquals(1, db.getListsForUser(tommy2.getUser_id()).size());
        String response = db.combineLists(watchlist1, watchlist2, tommy.getUser_id(), "USC Movies");
        assertTrue(response.contains("SUCCESS"));

        List<ListModel> l = db.getListsForUser(tommy.getUser_id());
        assertEquals(2, l.size());
        assertEquals(1, db.getListsForUser(tommy2.getUser_id()).size());
        assertEquals("USC Movies", l.get(1).getListName());
        assertEquals(6, l.get(1).getMovies().size());

    }

}
