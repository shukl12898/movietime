package edu.usc.csci310.project.credentials.api.controllers;

import edu.usc.csci310.project.APIHelper;
import edu.usc.csci310.project.DatabaseManager;
import edu.usc.csci310.project.UserModel;
import edu.usc.csci310.project.createUser.api.requests.CreateUserRequest;
import edu.usc.csci310.project.createUser.api.responses.CreateUserResponse;
import edu.usc.csci310.project.credentials.api.responses.CredentialsResponse;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CredentialsController {

    @GetMapping("/api/getKey")
    public ResponseEntity<CredentialsResponse> getCredentials() {
        CredentialsResponse response = new CredentialsResponse();
        try {
            String key = APIHelper.getAPIKey();
            response.setKey(key);
            response.setStatus(200);
        } catch (Exception e) {
            response.setStatus(401);
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(response);
        } // end catch
        return ResponseEntity.ok().body(response);
    }

}


