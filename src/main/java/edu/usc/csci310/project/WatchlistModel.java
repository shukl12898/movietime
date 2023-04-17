package edu.usc.csci310.project;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class WatchlistModel {
        private int user_id;
        private String watchlistName;
        private ArrayList<String> moviesInW;
        private int isPublic;

    public WatchlistModel(int user_id, String watchlistName, ArrayList<String> moviesInW, int isPublic) {
        this.user_id = user_id;
        this.watchlistName = watchlistName;
        this.moviesInW = moviesInW;
        this.isPublic = isPublic;
    }

    public String getWatchlistName() {
        return watchlistName;
    }

    public void setWName(String watchlistName) {
        this.watchlistName = watchlistName;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getPublic() { return isPublic; }

    public void setPublic(int val) { this.isPublic = val; }

    public ArrayList<String> getMoviesInW() {
        return this.moviesInW;
    }

    public void setMoviesInW(ArrayList<String> moviesInW) {
        this.moviesInW = moviesInW;
    }

}
