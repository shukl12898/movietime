package edu.usc.csci310.project.demo.api.controllers;

import edu.usc.csci310.project.montage.responses.MontageResponse;
import edu.usc.csci310.project.montage.service.MontageAPIService;
import edu.usc.csci310.project.montage.service.MontageService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.anyString;

class PhotoMontageServiceTest {

    @Mock
    private MontageAPIService mockMontageAPIService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetImagesWithNullIds() {
        MontageService montageService = new MontageService(mockMontageAPIService);
        ArrayList<Integer> ids = null;
        assertThrows(RuntimeException.class, () -> {
            montageService.getImages(ids);
        });
    }

    @Test
    public void testGetImages() {
        MontageService montageService = new MontageService(mockMontageAPIService);
        // Set up mock response
        LinkedHashMap<String, Object> backdrop1 = new LinkedHashMap<>();
        backdrop1.put("file_path", "/backdrop1.jpg");
        LinkedHashMap<String, Object> backdrop2 = new LinkedHashMap<>();
        backdrop2.put("file_path", "/backdrop2.jpg");
        LinkedHashMap<String, Object> responseMap1 = new LinkedHashMap<>();
        ArrayList backdropsList1 = new ArrayList();
        backdropsList1.add(backdrop1);
        backdropsList1.add(backdrop2);
        responseMap1.put("backdrops", backdropsList1);
        LinkedHashMap<String, Object> backdrop3 = new LinkedHashMap<>();
        backdrop3.put("file_path", "/backdrop3.jpg");
        LinkedHashMap<String, Object> backdrop4 = new LinkedHashMap<>();
        backdrop4.put("file_path", "/backdrop4.jpg");
        LinkedHashMap<String, Object> responseMap2 = new LinkedHashMap<>();
        ArrayList backdropsList2 = new ArrayList();
        backdropsList2.add(backdrop3);
        backdropsList2.add(backdrop4);
        responseMap2.put("backdrops", backdropsList2);
        ResponseEntity<Map> responseEntity1 = new ResponseEntity<>(responseMap1, HttpStatus.OK);
        ResponseEntity<Map> responseEntity2 = new ResponseEntity<>(responseMap2, HttpStatus.OK);
        Mockito.when(mockMontageAPIService.makeAPICall(anyString())).thenReturn(responseEntity1, responseEntity2);

        // Set up input data
        ArrayList<Integer> ids = new ArrayList<>();
        ids.add(1);
        ids.add(2);

        // Call method under test
        MontageResponse response = montageService.getImages(ids);

        // Verify results
        Assertions.assertNotNull(response);
        HashMap<Integer, ArrayList<String>> allResults = response.getAllResults();
        Assertions.assertNotNull(allResults);
        Assertions.assertEquals(2, allResults.size());
        Assertions.assertEquals(Arrays.asList("https://image.tmdb.org/t/p/w500/backdrop1.jpg", "https://image.tmdb.org/t/p/w500/backdrop2.jpg"), allResults.get(1));
        Assertions.assertEquals(Arrays.asList("https://image.tmdb.org/t/p/w500/backdrop3.jpg", "https://image.tmdb.org/t/p/w500/backdrop4.jpg"), allResults.get(2));
        ArrayList<MontageResponse.Image> montageImages = response.getMontageImages();
        Assertions.assertNotNull(montageImages);
        Assertions.assertEquals(4, montageImages.size());
        Assertions.assertEquals(1, montageImages.get(0).getID());
        Assertions.assertEquals("https://image.tmdb.org/t/p/w500/backdrop1.jpg", montageImages.get(0).getImagePath());
    }
}
