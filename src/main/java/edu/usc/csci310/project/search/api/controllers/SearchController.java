package edu.usc.csci310.project.search.api.controllers;
import edu.usc.csci310.project.search.api.response.SearchResponse;
import edu.usc.csci310.project.search.api.service.SearchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class SearchController {
    private final SearchService service;

    public SearchController(SearchService service) {
        this.service = service;
    }

    @GetMapping("/search_movie/{query}")
    public ResponseEntity<SearchResponse> getMoviesTitle(@PathVariable String query){
        SearchResponse response = service.getMoviesTitle(query);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search_keyword/{query}")
    public ResponseEntity<SearchResponse> getMoviesKeyword(@PathVariable String query){
        SearchResponse response = service.getMoviesKeyword(query);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search_person/{query}")
    public ResponseEntity<SearchResponse> getMoviesActor(@PathVariable String query){
        SearchResponse response = service.getMoviesActor(query);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/search_multi/{query}/{filters}")
    public ResponseEntity<SearchResponse> getMoviesMulti(@PathVariable String query,@PathVariable ArrayList<Object> filters){
        SearchResponse response = service.getMultiResults(query, filters);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }



}