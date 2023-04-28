package edu.usc.csci310.project.suggestion.api.service;

import edu.usc.csci310.project.suggestion.api.response.SuggestionResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class SuggestionService {
    private final String APIkey = "?api_key=7ed8d4771870299ac266b6147ba2fa76";

    public SuggestionResponse getSuggestions(int movieId) {
        SuggestionResponse response = new SuggestionResponse();

        RestTemplate restTemplate = new RestTemplate();

        // Fetch details of the selected movie
        Map<String, Object> firstSelectedMovie = restTemplate.getForObject(
                "https://api.themoviedb.org/3/movie/" + movieId + APIkey, Map.class);

        // Get the genre id of the first movie
        Map<String, Object> firstMovieGenre = ((List<Map<String, Object>>) firstSelectedMovie.get("genres")).get(0);
        int firstMovieGenreId = (int) firstMovieGenre.get("id");

        // Fetch suggested movies based on the genre
        Map<String, Object> suggestedMoviesData = restTemplate.getForObject(
                "https://api.themoviedb.org/3/discover/movie" + APIkey + "&with_genres=" + firstMovieGenreId, Map.class);

        response.setResults((List<Object>) suggestedMoviesData.get("results"));

        return response;
    }
}
