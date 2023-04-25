package edu.usc.csci310.project.moviedetails.responses;

import java.util.ArrayList;

public class MovieDetailsResponse {

    private int id = 0;
    private String title = null;
    private String overview = null;
    private String poster = null;
    private String year = null;

    private String director = null;

    private ArrayList<String> genres = new ArrayList<>();

    private ArrayList<String> productionCompanies = new ArrayList<>();

    private ArrayList<String> cast = new ArrayList<>();

    private boolean isValid;

    public void isValid() {
        boolean validTitle = (title != null);
        boolean validOverview = (overview != null);
        boolean validPoster = (poster != null);
        boolean validYear = (poster != null);
        boolean validDirector = (director != null);
        boolean validGenres = (!genres.isEmpty());
        boolean validProduction = (!productionCompanies.isEmpty());
        boolean validCast = (!cast.isEmpty());

        this.isValid = validTitle & validOverview & validPoster & validYear & validDirector & validGenres & validProduction & validCast;
    }

    public String getTitle() {
        return title;
    }

    public int getId() {return id;}
    public String getOverview() {
        return overview;
    }

    public String getPoster() {return poster;}

    public String getYear() {return year;}

    public ArrayList<String> getGenres() {return genres;}

    public ArrayList<String> getCast() {return cast;}

    public String getDirector() {return director;}

    public boolean getIsValid() {
        isValid();
        return isValid;
    }

    public ArrayList<String> getProductionCompanies() {return productionCompanies;}

    public void setID(int id) {this.id = id;}
    public void setTitle(String original_title) {
        this.title = original_title;
    }
    public void setOverview(String overview) {
        this.overview = overview;
    }
    public void setPoster(String poster) {this.poster = "https://image.tmdb.org/t/p/w500" + poster;}

    public void setYear(String date) {this.year = date.substring(0, 4);}

    public void setGenres(ArrayList genres) { this.genres = genres; }

    public void setProductionCompanies(ArrayList productionCompanies) {this.productionCompanies = productionCompanies;}

    public void setCast(ArrayList cast) { this.cast = cast; }

    public void setDirector(String director) { this.director = director; }
}