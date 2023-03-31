package edu.usc.csci310.project.login.api.controllers;

import edu.usc.csci310.project.DatabaseManager;
import edu.usc.csci310.project.UserModel;
import edu.usc.csci310.project.login.api.requests.LoginRequest;
import edu.usc.csci310.project.login.api.responses.LoginResponse;
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
            response.setUserId(u.getUser_id());
            response.setDisplayName(u.getDisplayName());
        } catch (Exception e) {
            if (e.getMessage().contains("such")) {
                response.setUserId(0000);
                response.setDisplayName("WRONG MISMATCH");
            } if (e.getMessage().contains("error")) {
                response.setUserId(404);
                response.setDisplayName("query");
            }

            else {
                response.setUserId(1);
                response.setDisplayName("WRONG with " + request.getUsername() + request.getPassword());
            }
            return ResponseEntity.ok().body(response);
        } // end catch
        return ResponseEntity.ok().body(response);
    }

}
