package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.moviedetails.responses.MovieDetailsResponse;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

public class MovieDetailsResponseTest {

    @Test
    public void testSetTitle() {
        MovieDetailsResponse response = new MovieDetailsResponse();
        String title = "The Matrix";
        response.setTitle(title);
        assertEquals(title, response.getTitle());
    }

    @Test
    public void testGetPoster() {
        MovieDetailsResponse response = new MovieDetailsResponse();
        String poster = "poster";
        response.setPoster(poster);
        String posterPath = "https://image.tmdb.org/t/p/w500" + poster;
        assertEquals(posterPath, response.getPoster());
    }

    @Test
    public void testGetID() {
        MovieDetailsResponse response = new MovieDetailsResponse();
        int id = 1;
        response.setID(id);
        assertEquals(id, response.getId());
    }

    @Test
    public void testGetYear() {
        MovieDetailsResponse response = new MovieDetailsResponse();
        String year = "2020-03-11";
        response.setYear(year);
        String yearExpected = year.substring(0,4);
        assertEquals(yearExpected, response.getYear());
    }

    @Test
    public void testSetYear() {
        MovieDetailsResponse response = new MovieDetailsResponse();
        String year = "202";
        response.setYear(year);
        String yearExpected = "Unknown";
        assertEquals(yearExpected, response.getYear());
    }

    @Test
    public void testSetGenres(){
        MovieDetailsResponse response = new MovieDetailsResponse();
        ArrayList<String> genres = new ArrayList<>(Arrays.asList("Comedy", "Action"));
        response.setGenres(genres);

        assertEquals(genres, response.getGenres());
    }

    @Test
    public void testSetCast(){
        MovieDetailsResponse response = new MovieDetailsResponse();
        ArrayList<String> cast = new ArrayList<>(Arrays.asList("Ryan Reynolds", "Harry Styles"));
        response.setCast(cast);

        assertEquals(cast, response.getCast());
    }

    @Test
    public void testSetDirector(){
        MovieDetailsResponse response = new MovieDetailsResponse();
        String director = "Olivia Wilde";
        response.setDirector(director);

        assertEquals(director, response.getDirector());
    }

    @Test
    public void testSetProduction(){
        MovieDetailsResponse response = new MovieDetailsResponse();
        ArrayList<String> companies = new ArrayList<>(Arrays.asList("Fox", "Warner Bros"));
        response.setProductionCompanies(companies);

        assertEquals(companies, response.getProductionCompanies());
    }

    @Test
    public void testSetOverview(){
        MovieDetailsResponse response = new MovieDetailsResponse();
        String overview = "overview";
        response.setOverview(overview);

        assertEquals(overview, response.getOverview());
    }

    @Test
    public void testIsNotValid(){
        MovieDetailsResponse response = new MovieDetailsResponse();

        assertFalse(response.getIsValid());
    }

    @Test
    public void testIsValid(){
        MovieDetailsResponse response = new MovieDetailsResponse();
        String title = "The Matrix";
        response.setTitle(title);
        String poster = "poster";
        response.setPoster(poster);
        String year = "2020-03-11";
        response.setYear(year);
        ArrayList<String> genres = new ArrayList<>(Arrays.asList("Comedy", "Action"));
        response.setGenres(genres);
        ArrayList<String> cast = new ArrayList<>(Arrays.asList("Ryan Reynolds", "Harry Styles"));
        response.setCast(cast);
        String director = "Olivia Wilde";
        response.setDirector(director);
        ArrayList<String> companies = new ArrayList<>(Arrays.asList("Fox", "Warner Bros"));
        response.setProductionCompanies(companies);
        String overview = "overview";
        response.setOverview(overview);


        assertTrue(response.getIsValid());
    }

}
