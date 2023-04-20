package edu.usc.csci310.project.moviedetails.service;
import edu.usc.csci310.project.moviedetails.responses.MovieDetailsResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class MovieDetailsService {
    @Value("${tmdb.apiKey}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public MovieDetailsService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public MovieDetailsResponse getMovieDetails(int movieId) {
        String url = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey;
        System.out.println("Sending request to URL: " + url);
        ResponseEntity<Map> responseEntity = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> responseMap = responseEntity.getBody();
        MovieDetailsResponse movieDetails = new MovieDetailsResponse();

        movieDetails.setTitle((String) responseMap.get("original_title"));
        movieDetails.setOverview((String) responseMap.get("overview"));
        return movieDetails;
    }
}
