package edu.usc.csci310.project;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EncryptionTest {

    @Test
    public void hashTest() {
        String correct_user = "oclavijo";
        String incorrect = "oclavij";
        String result = Encryption.hash(correct_user);

        assertEquals(result, Encryption.hash(correct_user));
        assertNotEquals(result, Encryption.hash(incorrect));
    }
}