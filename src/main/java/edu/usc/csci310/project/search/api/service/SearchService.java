package edu.usc.csci310.project.search.api.service;

import edu.usc.csci310.project.search.api.response.SearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class SearchService {

    @Value("${tmdb.apiKey}")
    private String apiKey;

    private final SearchAPIService service;

    public SearchService(SearchAPIService service) {
        this.service = service;
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
                    if (!finalResults.contains(result.get(i))){
                        finalResults.add(result.get(i));
                    }
                }
            }
            i++;
            nonEmptyResults.removeIf(result -> finalI >= result.size());
        }
        return finalResults;
    }
    public void filterResults(ArrayList results, boolean startEmpty, boolean endEmpty, Integer startYear, Integer endYear, Integer year, Integer id){

        if (!startEmpty && !endEmpty){
            if (year >= startYear && year <= endYear){
                results.add(id);
            }
        }
        else if (!startEmpty){
            if (year >= startYear){
                results.add(id);
            }
        }
        else {
            if (year <= endYear){
                results.add(id);
            }
        }
    }

    public String getKeywordYear(Integer id){
        String url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey;
        String year = "";
        try{
            ResponseEntity<Map> responseEntity = service.makeAPICall(url);
            Map<String, Object> responseMap = responseEntity.getBody();
            year = (String) responseMap.get("release_date");
        }
        catch (HttpClientErrorException | HttpServerErrorException e){
            System.out.println("An error occurred while calling the API: " + e.getMessage());
        }
        return year;
    }

    public SearchResponse getMoviesTitle(String query, String startYear, String endYear) {
        String url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + query + "&page=";
        SearchResponse searchResults = new SearchResponse();
        System.out.println("CALLING MOVIES TITLE FUNCTION");


        Integer startYearInt = Integer.parseInt(startYear);
        Integer endYearInt = Integer.parseInt(endYear);
        boolean startEmpty = (startYearInt == 0);
        boolean endEmpty = (endYearInt == 0);

        int pageNum = 1;
        ArrayList results = new ArrayList();
        while (results.size() < 20 && pageNum < 20){
            String newURL = url + pageNum;
            ResponseEntity<Map> responseEntity = service.makeAPICall(newURL);
            Map<String, Object> responseMap = responseEntity.getBody();

            ArrayList list = (ArrayList) responseMap.get("results");

            for (int i = 0; i < list.size(); i++){
                LinkedHashMap map = (LinkedHashMap) list.get(i);
                String year = (String) map.get("release_date");
                Integer id = (Integer) map.get("id");
                if (startEmpty && endEmpty){
                    results.add(id);
                }
                else{
                    if (!year.isEmpty()) {
                        year = year.substring(0, 4);
                        Integer yearInt = Integer.parseInt(year);
                        filterResults(results,startEmpty,endEmpty,startYearInt,endYearInt,yearInt,id);
                    }
                }
            }
            pageNum++;
        }

        searchResults.setMovieIDs(results);
        System.out.println("MOVIE TITLE RESULTS:");
        System.out.println(searchResults.getMovieIDs());


        return searchResults;
    }
    public SearchResponse getMoviesKeyword(String query, String startYear,String endYear)
    {
        String url = "https://api.themoviedb.org/3/search/keyword?api_key=" + apiKey + "&query=" + query + "&page=" ;
        System.out.println("Sending Keyword request to URL: " + url);
        SearchResponse searchResults = new SearchResponse();

        Integer startYearInt = Integer.parseInt(startYear);
        Integer endYearInt = Integer.parseInt(endYear);
        boolean startEmpty = (startYearInt == 0);
        boolean endEmpty = (endYearInt == 0);

        int pageNum = 1;
        ArrayList results = new ArrayList();
        while (results.size() < 20 && pageNum < 20){
            String newURL = url + pageNum;
            ResponseEntity<Map> responseEntity = service.makeAPICall(newURL);
            Map<String, Object> responseMap = responseEntity.getBody();

            ArrayList list = (ArrayList) responseMap.get("results");

            for (int i = 0; i < list.size(); i++){
                LinkedHashMap map = (LinkedHashMap) list.get(i);
                Integer id = (Integer) map.get("id");
                String year = getKeywordYear(id);
                if (startEmpty && endEmpty){
                    results.add(id);
                }
                else{
                    if (!year.isEmpty()) {
                        year = year.substring(0, 4);
                        Integer yearInt = Integer.parseInt(year);
                        filterResults(results,startEmpty,endEmpty,startYearInt,endYearInt,yearInt,id);
                    }
                }
            }
            pageNum++;
        }

        searchResults.setMovieIDs(results);
        System.out.println("MOVIE KEYWORD RESULTS:");
        System.out.println(searchResults.getMovieIDs());


        return searchResults;
    }
    public SearchResponse getMoviesActor(String query, String startYear, String endYear)
    {
        String url = "https://api.themoviedb.org/3/search/person?api_key=" + apiKey + "&query=" + query + "&page=";
        System.out.println("Sending Actor request to URL: " + url);
        SearchResponse searchResults = new SearchResponse();

        Integer startYearInt = Integer.parseInt(startYear);
        Integer endYearInt = Integer.parseInt(endYear);
        boolean startEmpty = (startYearInt == 0);
        boolean endEmpty = (endYearInt == 0);

        int pageNum = 1;
        ArrayList results = new ArrayList();
        ArrayList ids = new ArrayList();
        while (ids.size() < 20 && pageNum < 20){
            String newURL = url + pageNum;
            ResponseEntity<Map> responseEntity = service.makeAPICall(newURL);
            Map<String, Object> responseMap = responseEntity.getBody();

            ArrayList list = (ArrayList) responseMap.get("results");
            for (int i = 0; i < list.size(); i++){
                LinkedHashMap map = (LinkedHashMap) list.get(i);
                ArrayList info = (ArrayList) map.get("known_for");
                if (!info.isEmpty()){
                    results.add(info);
                }
            }

            for (int i = 0; i< results.size(); i++) {
                ArrayList actorInfo = (ArrayList) results.get(i);

                for (int j = 0; j < actorInfo.size(); j++){
                    LinkedHashMap map = (LinkedHashMap) actorInfo.get(j);
                    String year = (String) map.get("release_date");
                    Integer id = (Integer) map.get("id");
                    if (startEmpty && endEmpty){
                        ids.add(id);
                    }
                    else{
                        if (year != null) {
                            year = year.substring(0, 4);
                            Integer yearInt = Integer.parseInt(year);
                            filterResults(ids,startEmpty,endEmpty,startYearInt,endYearInt,yearInt,id);
                        }
                    }
                }

            }
            pageNum++;
        }

        System.out.println("ACTOR Results are");

        searchResults.setMovieIDs(ids);
        System.out.println(searchResults.getMovieIDs());
        return searchResults;
    }

    public SearchResponse getMultiResults(String query, List<Object> filters, String startYear, String endYear){
        System.out.println("CALLING MULTI FUNCTION");
        SearchResponse searchResults = new SearchResponse();
        ArrayList<Integer> movieResults = new ArrayList<>();
        ArrayList<Integer> keywordResults = new ArrayList<>();
        ArrayList<Integer> personResults = new ArrayList<>();
        System.out.println(filters.size());


        for (Object filter: filters){
            System.out.println(filter.getClass().getName());
            if (filter.equals("movie")){
                movieResults = getMoviesTitle(query,startYear,endYear).getMovieIDs();
            }
            if (filter.equals("keyword")){
                keywordResults = getMoviesKeyword(query,startYear,endYear).getMovieIDs();
            }
            if (filter.equals("person")){
                personResults = getMoviesActor(query,startYear,endYear).getMovieIDs();
            }
        }

        ArrayList<Integer> finalResults = sortResults(movieResults, keywordResults, personResults);

        System.out.println("MULTI RESULTS ARE");
        System.out.println(finalResults);
        searchResults.setMovieIDs(finalResults);

        return searchResults;

    }

}
