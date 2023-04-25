package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.moviedetails.responses.MovieDetailsResponse;
import edu.usc.csci310.project.moviedetails.service.MovieDetailsAPIService;
import edu.usc.csci310.project.moviedetails.service.MovieDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;

public class MovieDetailsServiceTest {

    @Mock
    private MovieDetailsAPIService apiService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetMovieDetails() {
        MovieDetailsService service = new MovieDetailsService(apiService);

        int movieID = 550;

        // Create a mock response for the API call
        Map<String, Object> mockResponseMap = new HashMap<>();
        mockResponseMap.put("original_title", "Fight Club");
        mockResponseMap.put("overview", "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.");
        mockResponseMap.put("poster_path", "/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg");
        mockResponseMap.put("release_date", "1999-10-12");
        ArrayList<LinkedHashMap<String, Object>> productionCompanies = new ArrayList<>();
        LinkedHashMap<String, Object> prodMap = new LinkedHashMap<>();
        prodMap.put("name", "20th Century Fox");
        productionCompanies.add(prodMap);
        mockResponseMap.put("production_companies", productionCompanies);
        ArrayList<LinkedHashMap<String, Object>> genres = new ArrayList<>();
        LinkedHashMap<String, Object> genreMap = new LinkedHashMap<>();
        genreMap.put("name", "Comedy");
        genres.add(genreMap);
        mockResponseMap.put("genres", genres);
        ArrayList<LinkedHashMap<String, Object>> crew = new ArrayList<>();
        LinkedHashMap<String, Object> crewMap = new LinkedHashMap<>();
        crewMap.put("name", "Olivia Wilde");
        crewMap.put("job", "Director");
        crew.add(crewMap);
        mockResponseMap.put("crew", crew);
        ArrayList<LinkedHashMap<String, Object>> cast = new ArrayList<>();
        LinkedHashMap<String, Object> castMap = new LinkedHashMap<>();
        castMap.put("name", "Olivia Wilde");
        castMap.put("known_for_department", "Acting");
        cast.add(castMap);
        mockResponseMap.put("cast", cast);


        ResponseEntity<Map> mockResponseEntity = new ResponseEntity<>(mockResponseMap, HttpStatus.OK);

        // Mock the API call and return the mock response
        Mockito.when(apiService.makeAPICall(anyString())).thenReturn(mockResponseEntity);

        MovieDetailsResponse movieDetails = service.getMovieDetails(movieID);

        assertEquals("Fight Club", movieDetails.getTitle());
        assertEquals("An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.", movieDetails.getOverview());
        assertEquals("https://image.tmdb.org/t/p/w500/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg", movieDetails.getPoster());

    }

    @Test
    public void testOtherMovieDetails() {
        MovieDetailsService service = new MovieDetailsService(apiService);

        int movieID = 550;

        // Create a mock response for the API call
        Map<String, Object> mockResponseMap = new HashMap<>();
        mockResponseMap.put("original_title", "Fight Club");
        mockResponseMap.put("overview", "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.");
        mockResponseMap.put("poster_path", "/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg");
        mockResponseMap.put("release_date", "1999-10-12");
        ArrayList<LinkedHashMap<String, Object>> productionCompanies = new ArrayList<>();
        LinkedHashMap<String, Object> prodMap = new LinkedHashMap<>();
        prodMap.put("name", "20th Century Fox");
        productionCompanies.add(prodMap);
        mockResponseMap.put("production_companies", productionCompanies);
        ArrayList<LinkedHashMap<String, Object>> genres = new ArrayList<>();
        LinkedHashMap<String, Object> genreMap = new LinkedHashMap<>();
        genreMap.put("name", "Comedy");
        genres.add(genreMap);
        mockResponseMap.put("genres", genres);
        ArrayList<LinkedHashMap<String, Object>> crew = new ArrayList<>();
        LinkedHashMap<String, Object> crewMap = new LinkedHashMap<>();
        crewMap.put("name", "Olivia Wilde");
        crewMap.put("job", "Picture");
        crew.add(crewMap);
        mockResponseMap.put("crew", crew);
        ArrayList<LinkedHashMap<String, Object>> cast = new ArrayList<>();
        LinkedHashMap<String, Object> castMap = new LinkedHashMap<>();
        castMap.put("name", "Olivia Wilde");
        castMap.put("known_for_department", "Singing");
        cast.add(castMap);
        mockResponseMap.put("cast", cast);


        ResponseEntity<Map> mockResponseEntity = new ResponseEntity<>(mockResponseMap, HttpStatus.OK);

        // Mock the API call and return the mock response
        Mockito.when(apiService.makeAPICall(anyString())).thenReturn(mockResponseEntity);

        MovieDetailsResponse movieDetails = service.getMovieDetails(movieID);

        assertEquals("Fight Club", movieDetails.getTitle());
    }
}
