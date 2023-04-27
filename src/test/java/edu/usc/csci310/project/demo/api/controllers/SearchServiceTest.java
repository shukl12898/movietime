package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.search.api.response.SearchResponse;
import edu.usc.csci310.project.search.api.service.SearchAPIService;
import edu.usc.csci310.project.search.api.service.SearchService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class SearchServiceTest {

    @Mock
    private SearchAPIService searchAPIServiceMock;
    private SearchService searchService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        searchService = new SearchService(searchAPIServiceMock);
    }

    @Test
    public void testGetMoviesTitle() {
        String query = "test";
        String startYear = "0";
        String endYear = "0";

        LinkedHashMap<String, Object> responseMap = new LinkedHashMap<>();
        ArrayList<LinkedHashMap<String, Object>> list = new ArrayList<>();

        for (int i = 0; i < 20; i++) {
            LinkedHashMap<String, Object> map = new LinkedHashMap<>();
            map.put("id", i + 1);
            map.put("release_date", "2020-01-01");
            list.add(map);
        }

        responseMap.put("results", list);

        ResponseEntity<Map> responseEntity = new ResponseEntity<>(responseMap, HttpStatus.OK);

        when(searchAPIServiceMock.makeAPICall(any(String.class))).thenReturn(responseEntity);

        SearchResponse searchResponse = searchService.getMoviesTitle(query, startYear, endYear);

        assertEquals(20, searchResponse.getMovieIDs().size());
    }

    @Test
    public void testGetMoviesKeyword() {
        String query = "test";
        String startYear = "0";
        String endYear = "0";

        LinkedHashMap<String, Object> responseMap = new LinkedHashMap<>();
        ArrayList<LinkedHashMap<String, Object>> list = new ArrayList<>();

        for (int i = 0; i < 20; i++) {
            LinkedHashMap<String, Object> map = new LinkedHashMap<>();
            map.put("id", i + 1);
            map.put("release_date", "2020-01-01");
            list.add(map);
        }

        responseMap.put("results", list);

        ResponseEntity<Map> responseEntity = new ResponseEntity<>(responseMap, HttpStatus.OK);

        when(searchAPIServiceMock.makeAPICall(any(String.class))).thenReturn(responseEntity);

        SearchResponse searchResponse = searchService.getMoviesKeyword(query, startYear, endYear);

        assertEquals(20, searchResponse.getMovieIDs().size());
    }

    @Test
    public void testGetMoviesActor() {
        String query = "test";
        String startYear = "0";
        String endYear = "0";

        LinkedHashMap<String, Object> responseMap = new LinkedHashMap<>();
        ArrayList<LinkedHashMap<String, Object>> list = new ArrayList<>();
        LinkedHashMap<String, Object> actorMap = new LinkedHashMap<>();
        ArrayList<LinkedHashMap<String, Object>> knownForList = new ArrayList<>();
        LinkedHashMap<String, Object> movieMap = new LinkedHashMap<>();

        for (int i = 0; i < 20; i++) {
            movieMap.put("id", i + 1);
            movieMap.put("release_date", "2020-01-01");
            knownForList.add(movieMap);
        }

        actorMap.put("known_for", knownForList);
        list.add(actorMap);
        responseMap.put("results", list);

        ResponseEntity<Map> responseEntity = new ResponseEntity<>(responseMap, HttpStatus.OK);

        when(searchAPIServiceMock.makeAPICall(any(String.class))).thenReturn(responseEntity);

        SearchResponse searchResponse = searchService.getMoviesActor(query, startYear, endYear);

        assertEquals(20, searchResponse.getMovieIDs().size());
    }

}
