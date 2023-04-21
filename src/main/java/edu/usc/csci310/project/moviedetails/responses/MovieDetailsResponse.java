package edu.usc.csci310.project.moviedetails.responses;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MovieDetailsResponse {
    private String title;
    private String overview;
    private String poster;
    private String year;

    private ArrayList<String> genres;

    private ArrayList<String> productionCompanies;

    private ArrayList<String> cast;

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

    public ArrayList<String> getProductionCompanies() {return productionCompanies;}

    public void setTitle(String original_title) {
        this.title = original_title;
    }
    public void setOverview(String overview) {
        this.overview = overview;
    }
    public void setPoster(String poster) {this.poster = "https://image.tmdb.org/t/p/w500" + poster;}

    public void setYear(String date) {this.year = date.substring(0, 4);}

    public void setGenres(String genres) {

        Pattern pattern = Pattern.compile("name=([^,}]+)");
        Matcher matcher = pattern.matcher(genres);

        this.genres = new ArrayList<>();

        while (matcher.find()) {
            this.genres.add(matcher.group(1));
        }

    }

    public void setProductionCompanies(String productionCompanies) {
        Pattern pattern = Pattern.compile("name=([^,}]+)");
        Matcher matcher = pattern.matcher(productionCompanies);

        this.productionCompanies = new ArrayList<>();

        while (matcher.find()) {
            this.productionCompanies.add(matcher.group(1));
        }
    }

    public void setCast(String cast) {
        String[] actors = cast.split("\\{\\s*\"adult\"");
        this.cast = new ArrayList<>();
        for (String actor : actors) {
            if (actor.contains("\"known_for_department\":\"Acting\"")) {
                String[] fields = actor.split(",");
                String name = "";
                for (String field : fields) {
                    if (field.contains("\"name\":\"")) {
                        name = field.substring(field.indexOf("\"name\":\"") + 8, field.indexOf("\",\"original_name\""));
                        break;
                    }
                }
                System.out.println(name);
                this.cast.add(name);
            }
        }
        System.out.println("received");
        for (String actorName : this.cast) {
            System.out.println(actorName);
        }
    }

}
