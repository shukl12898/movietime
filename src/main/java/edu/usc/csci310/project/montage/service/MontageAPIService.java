package edu.usc.csci310.project.montage.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class MontageAPIService {

    private final RestTemplate restTemplate;

    public MontageAPIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<Map> makeAPICall(String url){
        ResponseEntity<Map> responseEntity = restTemplate.getForEntity(url, Map.class);
        return responseEntity;
    }

}
