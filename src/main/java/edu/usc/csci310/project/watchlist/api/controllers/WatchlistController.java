package edu.usc.csci310.project.watchlist.api.controllers;

import edu.usc.csci310.project.DatabaseManager;
import edu.usc.csci310.project.ListModel;
import edu.usc.csci310.project.UserModel;
import edu.usc.csci310.project.watchlist.api.requests.NewWatchlistRequest;
import edu.usc.csci310.project.watchlist.api.requests.WatchlistRequest;
import edu.usc.csci310.project.watchlist.api.responses.NewWatchlistResponse;
import edu.usc.csci310.project.watchlist.api.responses.UserListResponse;
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
            System.out.println("Fetching lists for " + request.getUserId());
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

    @PostMapping("/api/getPublicLists={fromUser}")
    public ResponseEntity<WatchlistResponse> getListsByUser(@PathVariable("fromUser") int fromUser,
                                                             @RequestBody WatchlistRequest request) {

        WatchlistResponse response = new WatchlistResponse();
        try {
            DatabaseManager db = new DatabaseManager();
            System.out.println("Fetching lists for " + request.getUserId());
            ArrayList<ListModel> lists = db.getPublicListsForUser(fromUser);
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

    @PostMapping("/api/getUsers")
    public ResponseEntity<UserListResponse> getListOfUsers(@RequestBody WatchlistRequest request) {

        UserListResponse response = new UserListResponse();
        try {
            DatabaseManager db = new DatabaseManager();
            List<UserModel> users = db.getAllUsers(20);
            response.setUsers(users);

        } catch (Exception e) {
        }
        return ResponseEntity.ok().body(response);

    }

    @PostMapping("/api/newList")
    public ResponseEntity<NewWatchlistResponse> newList(@RequestBody NewWatchlistRequest request) {
        NewWatchlistResponse response = new NewWatchlistResponse();
        try {
            DatabaseManager db = new DatabaseManager();
            int listId = db.newWatchlist(request.getWatchListName(), request.getForUser(), request.isPrivate());
            if (listId == -1) {
                response.setStatus(401);
                response.setMessage("List name exists.");
            } else {
                response.setStatus(200);
                response.setMessage("Successfully created list.");
            }
        } catch (Exception e) {
            response.setStatus(401);
            response.setMessage("Error creating list.");
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

    @DeleteMapping("/api/watchlists/{watchlistId}/{movieId}")
    public String deleteMovie(@PathVariable("watchlistId") int watchlistId,
                              @PathVariable("movieId") int movieId,
                              @RequestBody WatchlistRequest request) {
        try {
            DatabaseManager db = new DatabaseManager();
            db.deleteFromWatchlist(movieId, watchlistId);
            return "Successfully deleted." ;
        } catch (Exception e) {
            return e.toString();
        }
    }

    @PostMapping("/api/watchlists/insertMovie={watchlistId}/{movieId}")
    public String insertMovie(@PathVariable("watchlistId") int watchlistId,
                                  @PathVariable("movieId") int movieId,
                                  @RequestBody WatchlistRequest request) {
        try {
            DatabaseManager db = new DatabaseManager();
            String fromDB = db.insertIntoWatchlist(movieId, watchlistId);
            if (fromDB.contains("already in list")) {
                return "Already in list";
            }
            return "Successfully added a new movie.";
        } catch (Exception e) {
            return e.toString();
        }
    }
    @PostMapping("/api/watchlists/changeList={watchlistId}/to={newName}")
    public String updateList(@PathVariable("watchlistId") int watchlistId,
                              @PathVariable("newName") String newName,
                              @RequestBody WatchlistRequest request) {
        try {
            DatabaseManager db = new DatabaseManager();
            String message = db.renameList(watchlistId, newName);
            return message;
        } catch (Exception e) {
            return e.toString();
        }
    }

    @PostMapping("/api/watchlists/fetchFor={movieId}")
    public ResponseEntity<WatchlistResponse>  fetchContainsMovie(@PathVariable("movieId") int movieId,
                                                                 @RequestBody WatchlistRequest request) {
        WatchlistResponse response = new WatchlistResponse();
        try {
            DatabaseManager db = new DatabaseManager();
            System.out.println("Fetching lists for " + request.getUserId());
            ArrayList<ListModel> lists = db.getListsForUser(request.getUserId());

            ArrayList<ListModel> result = new ArrayList<>();
            for (ListModel l : lists) {
                List<Integer> temp = l.getMovies();
                if (temp.contains(movieId)) {
                    result.add(l);
                    System.out.println("Found a movie match. ");
                }
            }
            response.setWatchlists(result);
            response.setStatus(200);
            response.setUser_id(request.getUserId());
        } catch (Exception e) {
            response.setStatus(401);
            response.setUser_id(-1);
            response.setWatchlists(new ArrayList<>());
        }
        return ResponseEntity.ok().body(response);

    }

    @PostMapping("/api/watchlists/combine={listOne}/and={listTwo}")
    public String combineLists(@PathVariable("listOne") int listOne,
                             @PathVariable("listTwo") int listTwo,
                             @RequestBody NewWatchlistRequest request) {
        try {
            DatabaseManager db = new DatabaseManager();
          //  String message = db.renameList(watchlistId, newName);
           return "";
        } catch (Exception e) {
            return e.toString();
        }
    }




}
