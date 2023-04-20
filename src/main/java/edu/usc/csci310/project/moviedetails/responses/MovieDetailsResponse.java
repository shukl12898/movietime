package edu.usc.csci310.project.moviedetails.responses;

public class MovieDetailsResponse {
    private String title;
    private String overview;

    public String getTitle() {
        return title;
    }
    public String getOverview() {
        return overview;
    }

    public void setTitle(String original_title) {
        this.title = original_title;
    }
    public void setOverview(String overview) {
        this.overview = overview;
    }

}
