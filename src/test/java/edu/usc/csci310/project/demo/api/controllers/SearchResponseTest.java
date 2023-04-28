package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.search.api.response.SearchResponse;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

public class SearchResponseTest {

    @Test
    public void testGetIDs() {
        SearchResponse response = new SearchResponse();
        ArrayList<Integer> ids = new ArrayList<>();
        ids.add(1);
        ids.add(2);
        response.setMovieIDs(ids);
        assertEquals(ids, response.getMovieIDs());
    }

}
