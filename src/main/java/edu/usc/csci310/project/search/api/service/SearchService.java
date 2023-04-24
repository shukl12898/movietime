package edu.usc.csci310.project.search.api.service;

//import edu.usc.csci310.project.moviedetails.responses.MovieDetailsResponse;
import edu.usc.csci310.project.search.api.response.SearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class SearchService {

    @Value("${tmdb.apiKey}")
    private String apiKey;

    private final RestTemplate restTemplate;

    public SearchService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public static ArrayList<Integer> sortResults(ArrayList<Integer>...results){
        ArrayList<Integer> finalResults = new ArrayList<>();
        int i = 0;
        ArrayList<ArrayList<Integer>> nonEmptyResults = new ArrayList<>();

        for (ArrayList<Integer> r : results){
            if (!r.isEmpty()){
                nonEmptyResults.add(r);
            }
        }

        while (finalResults.size() < 20 && !nonEmptyResults.isEmpty()){
            final int finalI = i;
            for (ArrayList<Integer> result : nonEmptyResults){
                if (i<result.size()){
                    finalResults.add(result.get(i));
                }
            }
            i++;
            nonEmptyResults.removeIf(result -> finalI >= result.size());
        }
        return finalResults;
    }
    public SearchResponse getMoviesTitle(String query) {
        String url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + query;
        System.out.println("Sending request to URL: " + url);
        ResponseEntity<Map> responseEntity = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> responseMap = responseEntity.getBody();
        SearchResponse searchResults = new SearchResponse();

        ArrayList list = (ArrayList) responseMap.get("results");
        ArrayList results = new ArrayList();

        for (int i = 0; i < list.size(); i++){
            LinkedHashMap map = (LinkedHashMap) list.get(i);
            Integer id = (Integer) map.get("id");
            results.add(id);
        }

        searchResults.setMovieIDs(results);
        System.out.println(searchResults.getMovieIDs());

        return searchResults;
    }
    public SearchResponse getMoviesKeyword(String query)
    {
        String url = "https://api.themoviedb.org/3/search/keyword?api_key=" + apiKey + "&query=" + query;
        System.out.println("Sending request to URL: " + url);
        ResponseEntity<Map> responseEntity = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> responseMap = responseEntity.getBody();
        SearchResponse searchResults = new SearchResponse();

        ArrayList list = (ArrayList) responseMap.get("results");
        ArrayList results = new ArrayList();

        for (int i = 0; i < list.size(); i++){
            LinkedHashMap map = (LinkedHashMap) list.get(i);
            Integer id = (Integer) map.get("id");
            results.add(id);
        }
        System.out.println("Results are");

        searchResults.setMovieIDs(results);
        System.out.println(searchResults.getMovieIDs());
        return searchResults;
    }
    public SearchResponse getMoviesActor(String query)
    {
        String url = "https://api.themoviedb.org/3/search/person?api_key=" + apiKey + "&query=" + query;
        System.out.println("Sending request to URL: " + url);
        ResponseEntity<Map> responseEntity = restTemplate.getForEntity(url, Map.class);
        Map<String, Object> responseMap = responseEntity.getBody();
        SearchResponse searchResults = new SearchResponse();

        ArrayList list = (ArrayList) responseMap.get("results");
        ArrayList results = new ArrayList();

        for (int i = 0; i < list.size(); i++){
            LinkedHashMap map = (LinkedHashMap) list.get(i);
            ArrayList info = (ArrayList) map.get("known_for");
            if (!info.isEmpty()){
                results.add(info);
            }
        }

        ArrayList ids = new ArrayList();

        for (int i = 0; i< results.size(); i++) {
            System.out.print("Results size:");
            System.out.print(results.get(i));
            ArrayList actorInfo = (ArrayList) results.get(i);

            for (int j = 0; j < actorInfo.size(); j++){
                LinkedHashMap map = (LinkedHashMap) actorInfo.get(j);
                System.out.println(map);
                Integer id = (Integer) map.get("id");
                ids.add(id);
            }

        }
        System.out.println("Results are");

        searchResults.setMovieIDs(ids);
        System.out.println(searchResults.getMovieIDs());
        return searchResults;
    }

    public SearchResponse getMultiResults(String query, List<Object> filters){
        System.out.println("CALLING FUNCTION");
        SearchResponse searchResults = new SearchResponse();
        ArrayList<Integer> movieResults = new ArrayList<Integer>();
        ArrayList<Integer> keywordResults = new ArrayList<Integer>();
        ArrayList<Integer> personResults = new ArrayList<Integer>();


        for (Object filter: filters){
            System.out.println("CALLING FOR LOOP");
            System.out.println(filter.getClass().getName());
            if (filter.equals("movie")){
                System.out.println("CALLING IF STATEMENT");
                movieResults = getMoviesTitle(query).getMovieIDs();
            }
            if (filter.equals("keyword")){
                keywordResults = getMoviesKeyword(query).getMovieIDs();
            }
            if (filter.equals("person")){
                personResults = getMoviesActor(query).getMovieIDs();
            }
        }

        ArrayList<Integer> finalResults = sortResults(movieResults, keywordResults, personResults);

        searchResults.setMovieIDs(finalResults);

        return searchResults;

    }

}
