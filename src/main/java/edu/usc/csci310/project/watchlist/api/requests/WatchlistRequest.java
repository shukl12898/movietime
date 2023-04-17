package edu.usc.csci310.project.watchlist.api.requests;

public class WatchlistRequest {
    private int user_id;

    private String watchlistName;

    private String movieName;

    private int isPublic;

    public int getUserID() {
        return user_id;
    }

    public void setUserID(int userID) {
        this.user_id = user_id;
    }

    public String getWatchlistName() {
        return watchlistName;
    }

    public void setWatchlistName(String watchlistName) {
        this.watchlistName = watchlistName;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public int getIsPublic() {
        return isPublic;
    }

    public void setIsPublic() {
        this.isPublic = isPublic;
    }


}
