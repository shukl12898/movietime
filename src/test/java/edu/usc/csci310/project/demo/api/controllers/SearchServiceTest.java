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

    @Test
    public void testSortResults() {
        ArrayList<Integer> list1 = new ArrayList<>();
        list1.add(1);
        list1.add(2);
        list1.add(3);

        ArrayList<Integer> list2 = new ArrayList<>();
        list2.add(2);
        list2.add(5);
        list2.add(6);

        ArrayList<Integer> list3 = new ArrayList<>();
        list3.add(7);
        list3.add(8);
        list3.add(9);

        ArrayList<Integer> result = SearchService.sortResults(list1, list2, list3);

        ArrayList<Integer> expected = new ArrayList<>();
        expected.add(1);
        expected.add(2);
        expected.add(7);
        expected.add(5);
        expected.add(8);
        expected.add(3);
        expected.add(6);
        expected.add(9);

        assertEquals(expected, result);
    }

    @Test
    void testFilterResults() {
        ArrayList<Integer> results = new ArrayList<>();
        boolean startEmpty = false;
        boolean endEmpty = false;
        Integer startYear = 2000;
        Integer endYear = 2020;

        // Test with a year inside the range
        Integer yearInRange = 2010;
        Integer idInRange = 1;
        searchService.filterResults(results, startEmpty, endEmpty, startYear, endYear, yearInRange, idInRange);
        assertEquals(1, results.size());
        assertEquals(idInRange, results.get(0));

        // Test with a year outside the range
        Integer yearOutOfRange = 1990;
        Integer idOutOfRange = 2;
        results.clear();
        searchService.filterResults(results, startEmpty, endEmpty, startYear, endYear, yearOutOfRange, idOutOfRange);
        assertEquals(0, results.size());

        // Test with startEmpty set to true
        startEmpty = true;
        Integer idStartEmpty = 3;
        Integer yearStartEmpty = 2015;
        results.clear();
        searchService.filterResults(results, startEmpty, endEmpty, startYear, endYear, yearStartEmpty, idStartEmpty);
        assertEquals(1, results.size());
        assertEquals(idStartEmpty, results.get(0));

        // Test with endEmpty set to true
        startEmpty = false;
        endEmpty = true;
        Integer idEndEmpty = 4;
        Integer yearEndEmpty = 1995;
        results.clear();
        searchService.filterResults(results, startEmpty, endEmpty, startYear, endYear, yearEndEmpty, idEndEmpty);
        assertEquals(0, results.size());
    }


//    @Test
//    public void testGetMultiResults() {
//        String query = "test";
//        String startYear = "0";
//        String endYear = "0";
//
//        ArrayList<Object> filters = new ArrayList<>();
//        filters.add("movie");
//        filters.add("keyword");
//        filters.add("person");
//
//        SearchResponse movieResponse = new SearchResponse();
//        ArrayList<Integer> movieIDs = new ArrayList<>();
//        movieIDs.add(1);
//        movieIDs.add(2);
//        movieResponse.setMovieIDs(movieIDs);
//
//        SearchResponse keywordResponse = new SearchResponse();
//        ArrayList<Integer> keywordIDs = new ArrayList<>();
//        keywordIDs.add(2);
//        keywordIDs.add(3);
//        keywordResponse.setMovieIDs(keywordIDs);
//
//        SearchResponse actorResponse = new SearchResponse();
//        ArrayList<Integer> actorIDs = new ArrayList<>();
//        actorIDs.add(1);
//        actorIDs.add(3);
//        actorResponse.setMovieIDs(actorIDs);
//
//        LinkedHashMap<String, Object> responseMap = new LinkedHashMap<>();
//        ArrayList<LinkedHashMap<String, Object>> resultList = new ArrayList<>();
//        LinkedHashMap<String, Object> movieMap = new LinkedHashMap<>();
//        LinkedHashMap<String, Object> keywordMap = new LinkedHashMap<>();
//        LinkedHashMap<String, Object> actorMap = new LinkedHashMap<>();
//
//        movieMap.put("id", 1);
//        resultList.add(movieMap);
//
//        keywordMap.put("id", 2);
//        resultList.add(keywordMap);
//
//        actorMap.put("id", 3);
//        resultList.add(actorMap);
//
//        responseMap.put("results", resultList);
//
//        ResponseEntity<Map> responseEntity = new ResponseEntity<>(responseMap, HttpStatus.OK);
//        when(searchAPIServiceMock.makeAPICall(any(String.class))).thenReturn(responseEntity);
//
//        SearchResponse searchResponse = searchService.getMultiResults(query, filters, startYear, endYear);
//
//        assertEquals(3, searchResponse.getMovieIDs().size());
//        assertTrue(searchResponse.getMovieIDs().contains(1));
//        assertTrue(searchResponse.getMovieIDs().contains(2));
//        assertTrue(searchResponse.getMovieIDs().contains(3));
//    }

}
