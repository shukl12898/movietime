package edu.usc.csci310.project.moviedetails.responses;

import java.util.ArrayList;

public class MovieDetailsResponse {
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
        System.out.println("title: " + title);
        boolean validOverview = (overview != null);
        System.out.println("overview: " + overview);
        boolean validPoster = (poster != null);
        System.out.println("poster: " + poster);
        boolean validYear = (poster != null);
        System.out.println("year: " + year);
        boolean validDirector = (director != null);
        System.out.println("director: " + director);
        boolean validGenres = (!genres.isEmpty());
        System.out.print("genres: ");
        for (int i = 0; i < genres.size(); i++){
            System.out.println(genres.get(i));
        }
        boolean validProduction = (!productionCompanies.isEmpty());
        System.out.print("production: ");
        for (int i = 0; i < productionCompanies.size(); i++){
            System.out.println(productionCompanies.get(i));
        }
        boolean validCast = (!cast.isEmpty());
        System.out.print("cast: ");
        for (int i = 0; i < cast.size(); i++){
            System.out.println(cast.get(i));
        }

        this.isValid = validTitle & validOverview & validPoster & validYear & validDirector & validGenres & validProduction & validCast;
    }

    public String getTitle() {
        return title;
    }
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