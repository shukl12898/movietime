package edu.usc.csci310.project.watchlist.api.requests;

public class NewWatchlistRequest {

    private String watchListName;
    private int forUser;

    public String getWatchListName() {
        return watchListName;
    }

    public void setWatchListName(String watchListName) {
        this.watchListName = watchListName;
    }

    public int getForUser() {
        return forUser;
    }

    public void setForUser(int forUser) {
        this.forUser = forUser;
    }
}
