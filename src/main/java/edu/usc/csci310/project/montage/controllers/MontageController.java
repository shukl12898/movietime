package edu.usc.csci310.project.montage.controllers;
import edu.usc.csci310.project.montage.responses.MontageResponse;
import edu.usc.csci310.project.montage.service.MontageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class MontageController {
    private final MontageService service;

    public MontageController(MontageService service) {
        this.service = service;
    }

    @GetMapping("/images/{ids}")
    public ResponseEntity<?> getMovieImages(@PathVariable ArrayList<Integer> ids){
        MontageResponse response = service.getImages(ids);
        try{
            if (ids == null) {
                throw new IllegalArgumentException("Invalid parameter");
            }
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}