package edu.usc.csci310.project;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.sql.*;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class DatabaseManagerTest {

    @Test
    public void testTableCreation() throws Exception{

        DatabaseManager db = new DatabaseManager();
        db.dropAllTables();
        db = new DatabaseManager();
        assertEquals(0, db.getAllUsers(100).size());
        UserModel u = db.createNewUser("tommyTrojan", "password", "Tommy");
        assertEquals("Tommy", u.getDisplayName());

    }

}