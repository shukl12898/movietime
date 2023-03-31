package edu.usc.csci310.project;
import org.junit.Test;

import java.sql.*;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class DatabaseManagerTest {

    @Test
    public void testTableCreation() throws Exception{

        DatabaseManager db = new DatabaseManager();
        assertNotEquals(0, db.getAllUsers(100));
        db.dropAllTables();
        db = new DatabaseManager();
        assertEquals(0, db.getAllUsers(100));

    }

}