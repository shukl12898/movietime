package edu.usc.csci310.project.createUser.api.controllers;

import edu.usc.csci310.project.DatabaseManager;
import edu.usc.csci310.project.UserModel;
import edu.usc.csci310.project.createUser.api.requests.CreateUserRequest;
import edu.usc.csci310.project.createUser.api.responses.CreateUserResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/createUser")
public class CreateUserController {

    @PostMapping
    public ResponseEntity<CreateUserResponse> verifyLogin(@RequestBody CreateUserRequest request) {
        CreateUserResponse response = new CreateUserResponse();
        try {
            DatabaseManager db = new DatabaseManager();
            UserModel u = db.createNewUser(request.getUsername(), request.getPassword(), request.getName());
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
