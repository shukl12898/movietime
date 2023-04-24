package edu.usc.csci310.project.moviedetails.controllers;
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
    public ResponseEntity<?> getMovieDetails(@PathVariable int id){
        MovieDetailsResponse response = service.getMovieDetails(id);
        try{
            if (id < 0) {
                throw new IllegalArgumentException("Invalid movieID");
            }
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}