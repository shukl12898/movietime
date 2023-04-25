package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.moviedetails.controllers.MovieDetailsController;
import edu.usc.csci310.project.moviedetails.responses.MovieDetailsResponse;
import edu.usc.csci310.project.moviedetails.service.MovieDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class MovieDetailsControllerTest {

    @Mock
    private MovieDetailsService service;

    @InjectMocks
    private MovieDetailsController controller;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetMovieDetailsWithValidId() {
        int movieId = 123;
        MovieDetailsResponse expectedResponse = new MovieDetailsResponse();

        when(service.getMovieDetails(movieId)).thenReturn(expectedResponse);

        ResponseEntity<?> responseEntity = controller.getMovieDetails(movieId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponse, responseEntity.getBody());
    }

    @Test
    public void testGetMovieDetailsWithInvalidId() {
        int movieId = -1;

        ResponseEntity<?> responseEntity = controller.getMovieDetails(movieId);

        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Invalid movieID", responseEntity.getBody());
    }
}
