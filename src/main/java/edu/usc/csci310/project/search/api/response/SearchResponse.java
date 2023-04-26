package edu.usc.csci310.project.search.api.response;

import java.util.ArrayList;

public class SearchResponse {
    private ArrayList<Integer> movieIDs = new ArrayList<>();

    public ArrayList<Integer> getMovieIDs(){ return movieIDs;}

    public void setMovieIDs(ArrayList<Integer> ids){
        movieIDs = ids;
    }

}
