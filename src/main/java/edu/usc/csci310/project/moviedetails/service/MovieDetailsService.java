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
        movieDetails.setPoster((String) responseMap.get("poster_path"));
        movieDetails.setYear((String) responseMap.get("release_date"));
        movieDetails.setGenres(responseMap.get("genres").toString());
        movieDetails.setProductionCompanies(responseMap.get("production_companies").toString());

        String castUrl = "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + apiKey;
        System.out.println("Sending request to URL: " + castUrl);
        ResponseEntity<Map> responseEntity2 = restTemplate.getForEntity(castUrl, Map.class);
        Map<String, Object> responseMap2 = responseEntity2.getBody();

        movieDetails.setCast(responseMap2.get("cast").toString());

        return movieDetails;
    }
}
