package edu.usc.csci310.project.watchlist.api.controllers;

import com.google.gson.Gson;
import edu.usc.csci310.project.DatabaseManager;
import edu.usc.csci310.project.WatchlistDatabaseManager;
import edu.usc.csci310.project.WatchlistModel;
import edu.usc.csci310.project.watchlist.api.requests.WatchlistRequest;
import edu.usc.csci310.project.watchlist.api.responses.WatchlistResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchlistController {
    @PostMapping
    public ResponseEntity<WatchlistResponse> viewUserWatchlists(@RequestBody WatchlistRequest request) {
        WatchlistResponse response = new WatchlistResponse();
        try {
            int user_id = request.getUserID();
            String watchlistName = request.getWatchlistName();
            WatchlistDatabaseManager wdb = new WatchlistDatabaseManager();
            List<WatchlistModel> userWatchlists = wdb.getAllUserWatchlists(user_id);
            String json = new Gson().toJson(userWatchlists);
            response.setUserWatchlists(json);

        } catch (Exception e) {

            if (e.getMessage().contains("error")) {
                response.setUserWatchlists("404");
            }
            else {
                response.setUserWatchlists("");
            }
            return ResponseEntity.ok().body(response);
        } // end catch
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<WatchlistResponse> addMovieToWatchlist(@RequestBody WatchlistRequest request) {
        WatchlistResponse response = new WatchlistResponse();
        try {
            int user_id = request.getUserID();
            String watchlistName = request.getWatchlistName();
            int isPublic = request.getIsPublic();
            String movieName = request.getMovieName();
            WatchlistDatabaseManager wdb = new WatchlistDatabaseManager();
            wdb.addToWatchlist(user_id, watchlistName, movieName, isPublic);
            WatchlistModel userWatchlist = wdb.getWatchlist(user_id, watchlistName);
            String json = new Gson().toJson(userWatchlist);
            response.setUserWatchlists(json);

        } catch (Exception e) {

            if (e.getMessage().contains("error")) {
                response.setUserWatchlists("404");
            }
            else {
                response.setUserWatchlists("");
            }
            return ResponseEntity.ok().body(response);
        } // end catch
        return ResponseEntity.ok().body(response);
    }

    /*
    @PostMapping

    public ResponseEntity<WatchlistResponse> addMovieToWatchlist(@RequestBody WatchlistRequest request) {
        WatchlistResponse response = new WatchlistResponse();
        try {
            int user_id = request.getUserID();
            String watchlistName = request.getWatchlistName();
            String movieName = request.getMovieName();
            int isPublic = request.getIsPublic();
            WatchlistDatabaseManager wdb = new WatchlistDatabaseManager();
            wdb.addToWatchlist(user_id, watchlistName, movieName, isPublic);
            String json = new Gson().toJson(userWatchlists);
            response.setUserWatchlists(json);

        } catch (Exception e) {

            if (e.getMessage().contains("error")) {
                response.setUserWatchlists("404");
            }
            else {
                response.setUserWatchlists("");
            }
            return ResponseEntity.ok().body(response);
        } // end catch
        return ResponseEntity.ok().body(response);
    }
    */


}
