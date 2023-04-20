package edu.usc.csci310.project.watchlist.api.responses;

import edu.usc.csci310.project.ListModel;

import java.util.ArrayList;

public class WatchlistResponse {

    private int status;
    private int user_id;
    private ArrayList<ListModel> watchlists;

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public ArrayList<ListModel> getWatchlists() {
        return watchlists;
    }

    public void setWatchlists(ArrayList<ListModel> watchlists) {
        this.watchlists = watchlists;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
