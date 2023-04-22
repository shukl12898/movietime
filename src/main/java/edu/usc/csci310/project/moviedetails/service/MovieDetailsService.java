package edu.usc.csci310.project.moviedetails.service;
import edu.usc.csci310.project.moviedetails.responses.MovieDetailsResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
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

        ArrayList list = (ArrayList) responseMap.get("production_companies");
        ArrayList productionCompanies = new ArrayList();

        for (int i = 0; i < list.size(); i++){
            LinkedHashMap map = (LinkedHashMap) list.get(i);
            String company = (String) map.get("name");
            productionCompanies.add(company);
        }

        movieDetails.setProductionCompanies(productionCompanies);

        list = (ArrayList) responseMap.get("genres");
        ArrayList genres = new ArrayList();

        for (int i = 0; i < list.size(); i++){
            LinkedHashMap map = (LinkedHashMap) list.get(i);
            String company = (String) map.get("name");
            genres.add(company);
        }

        movieDetails.setGenres(genres);

        String castUrl = "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=" + apiKey;
        System.out.println("Sending request to URL: " + castUrl);
        ResponseEntity<Map> responseEntity2 = restTemplate.getForEntity(castUrl, Map.class);
        Map<String, Object> responseMap2 = responseEntity2.getBody();

        list = (ArrayList) responseMap2.get("crew");

        for (int i = 0; i < list.size(); i++){
            LinkedHashMap map = (LinkedHashMap) list.get(i);
            String job = (String) map.get("job");
            if (job.equals("Director")){
                movieDetails.setDirector((String) map.get("name"));
            }
        }

        list = (ArrayList) responseMap2.get("cast");
        ArrayList actors = new ArrayList();

        for (int i = 0; i < list.size(); i++){
            LinkedHashMap map = (LinkedHashMap) list.get(i);
            String knownFor = (String) map.get("known_for_department");
            if (knownFor.equals("Acting")){
                String actor = (String) map.get("name");
                actors.add(actor);
            }
        }

        movieDetails.setCast(actors);
        return movieDetails;
    }
}
