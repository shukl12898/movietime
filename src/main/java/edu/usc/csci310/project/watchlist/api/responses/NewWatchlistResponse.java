package edu.usc.csci310.project.watchlist.api.responses;

public class NewWatchlistResponse {

    private int status;
    private String message;
    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
