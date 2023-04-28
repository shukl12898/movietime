package edu.usc.csci310.project.suggestion.api.controllers;

import edu.usc.csci310.project.suggestion.api.response.SuggestionResponse;
import edu.usc.csci310.project.suggestion.api.service.SuggestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SuggestionController {
    private final SuggestionService service;

    public SuggestionController(SuggestionService service) {
        this.service = service;
    }

    @GetMapping("/api/suggestions/{movieId}")
    public ResponseEntity<SuggestionResponse> getSuggestions(@PathVariable int movieId) {
        SuggestionResponse response = service.getSuggestions(movieId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
