package edu.usc.csci310.project.search.api.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class SearchAPIService {
    private final RestTemplate restTemplate;

    public SearchAPIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<Map> makeAPICall(String url){
        ResponseEntity<Map> responseEntity = restTemplate.getForEntity(url, Map.class);
        return responseEntity;
    }
}
