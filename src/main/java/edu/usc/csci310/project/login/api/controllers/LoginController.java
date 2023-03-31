package edu.usc.csci310.project.login.api.controllers;

import edu.usc.csci310.project.DatabaseManager;
import edu.usc.csci310.project.UserModel;
import edu.usc.csci310.project.login.api.requests.LoginRequest;
import edu.usc.csci310.project.login.api.responses.LoginResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @PostMapping
    public ResponseEntity<LoginResponse> verifyLogin(@RequestBody LoginRequest request) {
        LoginResponse response = new LoginResponse();
        try {
            DatabaseManager db = new DatabaseManager();
            UserModel u = db.getUser(request.getUsername(), request.getPassword());
            db.close();
            response.setUserId(u.getUser_id());
            response.setDisplayName(u.getDisplayName());
            response.setStatus(200); // ok
        } catch (Exception e) {
            response.setStatus(401);
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(response);
        } // end catch
        return ResponseEntity.ok().body(response);
    }

}
