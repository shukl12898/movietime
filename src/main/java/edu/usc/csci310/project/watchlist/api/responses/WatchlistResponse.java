package edu.usc.csci310.project.watchlist.api.responses;

import edu.usc.csci310.project.WatchlistModel;

import java.util.ArrayList;

public class WatchlistResponse {

    private String userWatchlists;
    public String getUserWatchlists() {
        return userWatchlists;
    }
    public void setUserWatchlists(String userWatchlists) {
        this.userWatchlists = userWatchlists;
    }
}
