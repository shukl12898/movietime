package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.montage.controllers.MontageController;
import edu.usc.csci310.project.montage.responses.MontageResponse;
import edu.usc.csci310.project.montage.service.MontageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

public class PhotoMontageControllerTest {

    @Mock
    MontageService montageServiceMock;

    MontageController montageController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        montageController = new MontageController(montageServiceMock);
    }

    @Test
    public void testGetMovieImages_Success() {
        ArrayList<Integer> ids = new ArrayList<>();
        ids.add(123);
        ids.add(456);

        MontageResponse response = new MontageResponse();
        ResponseEntity<MontageResponse> expectedResponse = new ResponseEntity<>(response, HttpStatus.OK);

        when(montageServiceMock.getImages(ids)).thenReturn(response);

        ResponseEntity<?> actualResponse = montageController.getMovieImages(ids);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void testGetMovieImages_Exception(){
        ResponseEntity<?> actualResponse = montageController.getMovieImages(null);

        assertEquals(HttpStatus.BAD_REQUEST, actualResponse.getStatusCode());
        assertEquals("Invalid parameter", actualResponse.getBody());
    }

}
