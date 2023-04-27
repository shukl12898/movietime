package edu.usc.csci310.project.watchlist.api.requests;

public class NewWatchlistRequest {

    private String watchListName;
    private int forUser;
    private boolean isPrivate;

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

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }
}
