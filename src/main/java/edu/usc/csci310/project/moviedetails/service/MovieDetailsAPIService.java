package edu.usc.csci310.project.moviedetails.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class MovieDetailsAPIService {

    private final RestTemplate restTemplate;

    public MovieDetailsAPIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<Map> makeAPICall(String url){
        ResponseEntity<Map> responseEntity = null;
        try{
            responseEntity = restTemplate.getForEntity(url, Map.class);
        }
        catch (HttpClientErrorException | HttpServerErrorException e){
            System.out.println("An error occurred while calling the API: " + e.getMessage());
        }
        return responseEntity;
    }

}
