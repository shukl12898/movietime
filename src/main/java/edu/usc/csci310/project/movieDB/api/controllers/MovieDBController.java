package edu.usc.csci310.project.movieDB.api.controllers;
import com.google.gson.Gson;
import edu.usc.csci310.project.movieDB.api.requests.MovieByIdRequest;
import edu.usc.csci310.project.movieDB.api.responses.MovieObjectResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
public class MovieDBController {

    @GetMapping("/api/getMovieById/{movieId}")
    public ResponseEntity<MovieObjectResponse> getData(
            @PathVariable("movieId") int movieId) {
        MovieObjectResponse response = fetchMovie("5e9de98263d160a232935f6d95ab878d",movieId);
        return ResponseEntity.ok().body(response);

    }
    public static MovieObjectResponse fetchMovie(String apiKey, int movieId) {
        String urlString = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey + "&language=en-US";
        System.out.println(urlString);
        try {
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");

            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String line;
                StringBuilder response = new StringBuilder();
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                Gson gson = new Gson();
                MovieObjectResponse movie = gson.fromJson(response.toString(), MovieObjectResponse.class);
                return movie;
            } else {
                System.out.println("GET request failed. Response Code: " + responseCode);
                return null;
            }
        } catch (IOException e) {
            System.out.println("Error fetching movie data: " + e.getMessage());
            return null;
        }
    }
}
