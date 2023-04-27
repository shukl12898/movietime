package edu.usc.csci310.project.demo.api.controllers;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import edu.usc.csci310.project.search.api.controllers.SearchController;
import edu.usc.csci310.project.search.api.response.SearchResponse;
import edu.usc.csci310.project.search.api.service.SearchService;
import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class SearchControllerTest {
    @Mock private SearchService searchService;
    private SearchController searchController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        searchController = new SearchController(searchService);
    }

    @Test
    public void testGetMoviesTitle() {
        SearchResponse expectedResponse = new SearchResponse();
        when(searchService.getMoviesTitle("Star Wars", "1977", "2021")).thenReturn(expectedResponse);

        ResponseEntity<SearchResponse> response = searchController.getMoviesTitle("Star Wars", "1977", "2021");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void testGetMoviesKeyword() {
        SearchResponse expectedResponse = new SearchResponse();
        when(searchService.getMoviesKeyword("Action", "1977", "2021")).thenReturn(expectedResponse);

        ResponseEntity<SearchResponse> response = searchController.getMoviesKeyword("Action", "1977", "2021");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void testGetMoviesActor() {
        SearchResponse expectedResponse = new SearchResponse();
        when(searchService.getMoviesActor("Harrison Ford", "1977", "2021")).thenReturn(expectedResponse);

        ResponseEntity<SearchResponse> response = searchController.getMoviesActor("Harrison Ford", "1977", "2021");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }

    @Test
    public void testGetMoviesMulti() {
        SearchResponse expectedResponse = new SearchResponse();
        ArrayList<Object> filters = new ArrayList<>();
        filters.add("Action");
        filters.add("Adventure");
        when(searchService.getMultiResults("Star Wars", filters, "1977", "2021")).thenReturn(expectedResponse);

        ResponseEntity<SearchResponse> response =
                searchController.getMoviesMulti("Star Wars", filters, "1977", "2021");

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isEqualTo(expectedResponse);
    }
}
