package edu.usc.csci310.project.demo.api.controllers;


import static org.junit.jupiter.api.Assertions.*;

import edu.usc.csci310.project.*;
import edu.usc.csci310.project.login.api.controllers.LoginController;
import edu.usc.csci310.project.login.api.requests.LoginRequest;
import edu.usc.csci310.project.login.api.responses.LoginResponse;
import org.junit.Before;
import org.junit.jupiter.api.Test;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
public class LoginControllerTest {

    LoginController l = new LoginController();
    DatabaseManager db;
    @Before
    void setUp() throws Exception {
        db = new DatabaseManager();
        db.dropAllTables();
        db.close();
        db = new DatabaseManager();
        db.insertIntoUser("tommytrojan", "password");
        db.close();
    }
    @Test
    void testLogin() throws Exception {
        LoginRequest rq = new LoginRequest();
        rq.setPassword("password");
        rq.setUsername("tommytrojan");

        ResponseEntity<LoginResponse> rsp = l.verifyLogin(rq);
        assertEquals(HttpStatusCode.valueOf(200), rsp.getStatusCode());

        LoginResponse r = rsp.getBody();
        assertEquals("tommytrojan", r.getDisplayName());
        assertEquals(1, r.getUserId());
        assertEquals(200, r.getStatus());

        rq.setPassword("wrongpassword");
        rq.setUsername("tommytrojan");
        rsp = l.verifyLogin(rq);
        assertEquals(HttpStatusCode.valueOf(401), rsp.getStatusCode());

        r = rsp.getBody();
        assertEquals(null, r.getDisplayName());
        assertEquals(0, r.getUserId());
        assertEquals(401, r.getStatus());

        rq.setPassword("password");
        rq.setUsername("trojan");
        r = rsp.getBody();
        assertEquals(null, r.getDisplayName());
        assertEquals(0, r.getUserId());
        assertEquals(401, r.getStatus());


    }


}