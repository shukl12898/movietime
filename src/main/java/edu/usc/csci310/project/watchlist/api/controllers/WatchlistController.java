package edu.usc.csci310.project.watchlist.api.controllers;

import edu.usc.csci310.project.DatabaseManager;
import edu.usc.csci310.project.ListModel;
import edu.usc.csci310.project.UserModel;
import edu.usc.csci310.project.watchlist.api.requests.WatchlistRequest;
import edu.usc.csci310.project.watchlist.api.responses.WatchlistResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class WatchlistController {

    @PostMapping("/api/getAllLists")
    public ResponseEntity<WatchlistResponse> getAllLists(@RequestBody WatchlistRequest request) {

        WatchlistResponse response = new WatchlistResponse();
        try {
            DatabaseManager db = new DatabaseManager();

            ArrayList<ListModel> lists = db.getListsForUser(request.getUserId());
            response.setWatchlists(lists);
            response.setStatus(200);
            response.setUser_id(request.getUserId());

        } catch (Exception e) {
            response.setStatus(401);
            response.setUser_id(-1);
            response.setWatchlists(new ArrayList<>());
        }
        return ResponseEntity.ok().body(response);

    }

    @DeleteMapping("/api/watchlists/{watchlistId}")
    public String deleteWatchlist(@PathVariable("watchlistId") int watchlistId, @RequestBody WatchlistRequest request) {
        try {
            DatabaseManager db = new DatabaseManager();
            db.deleteWatchlist(watchlistId);
            return "Successfully deleted.";
        } catch (Exception e) {
            return e.toString();
        }
    }

}
