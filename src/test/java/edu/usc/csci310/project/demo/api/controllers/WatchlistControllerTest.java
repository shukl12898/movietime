package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.DatabaseManager;
import edu.usc.csci310.project.watchlist.api.controllers.WatchlistController;
import edu.usc.csci310.project.watchlist.api.requests.NewWatchlistRequest;
import edu.usc.csci310.project.watchlist.api.requests.WatchlistRequest;
import edu.usc.csci310.project.watchlist.api.responses.NewWatchlistResponse;
import edu.usc.csci310.project.watchlist.api.responses.WatchlistResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

public class WatchlistControllerTest {
    WatchlistController watchlistController = new WatchlistController();

    private DatabaseManager db;

    private final MockMvc mockMvc;

    public WatchlistControllerTest(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    //@Test
    void newWatchlist() {
        NewWatchlistRequest request = new NewWatchlistRequest();
        request.setWatchListName("Test");
        request.setPrivate(true);
        request.setForUser(1);

        ResponseEntity<NewWatchlistResponse> returnedResponse = watchlistController.newList(request);

        assertNotNull(returnedResponse.getBody());
        assertTrue(returnedResponse.getBody().getMessage().contains("Successfully created list."));
    }

    //@Test
    void testDeleteWatchlist() throws Exception {
        int watchlistId = 123;
        //DatabaseManager db = mock(DatabaseManager.class);
        Mockito.doNothing().when(db).deleteWatchlist(watchlistId);

        String requestContent = "{\"name\": \"My Watchlist\"}";

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/watchlists/" + watchlistId)
                        .content(requestContent)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string("Successfully deleted."));
    }
}
