package edu.usc.csci310.project;
import java.util.ArrayList;
import java.util.List;

public class ListModel {

    private String listName;
    private int userId;
    private int listId;
    private boolean isPrivate;
    private ArrayList<Integer> movies;

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getListId() {
        return listId;
    }

    public void setListId(int listId) {
        this.listId = listId;
    }


    public ArrayList<Integer> getMovies() {
        return movies;
    }

    public void setMovies(ArrayList<Integer> movies) {
        this.movies = movies;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }
}
