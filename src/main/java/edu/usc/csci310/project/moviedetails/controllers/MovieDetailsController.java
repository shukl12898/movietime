package edu.usc.csci310.project.moviedetails.controllers;
import com.fasterxml.jackson.core.JsonProcessingException;
import edu.usc.csci310.project.moviedetails.responses.MovieDetailsResponse;
import edu.usc.csci310.project.moviedetails.service.MovieDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MovieDetailsController {
    private final MovieDetailsService service;

    public MovieDetailsController(MovieDetailsService service) {
        this.service = service;
    }

    @GetMapping("/movies/{id}")
    public ResponseEntity<MovieDetailsResponse> getMovieTitle(@PathVariable int id){
        MovieDetailsResponse response = service.getMovieDetails(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
