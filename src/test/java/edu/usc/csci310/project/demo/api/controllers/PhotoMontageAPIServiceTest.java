package edu.usc.csci310.project.demo.api.controllers;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import edu.usc.csci310.project.montage.service.MontageAPIService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@RunWith(MockitoJUnitRunner.class)
public class PhotoMontageAPIServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private MontageAPIService montageAPIService;

    @Before
    public void setUp() {
        montageAPIService = new MontageAPIService(restTemplate);
    }

    @Test
    public void testMakeAPICall() {
        String url = "https://api.themoviedb.org/3/movie/550/images?api_key=testkey";
        Map<String, Object> mockResponse = new HashMap<>();
        mockResponse.put("backdrops", Arrays.asList(
                new HashMap<String, Object>() {{
                    put("file_path", "/backdrop1.jpg");
                }},
                new HashMap<String, Object>() {{
                    put("file_path", "/backdrop2.jpg");
                }}
        ));
        ResponseEntity<Map> responseEntity = ResponseEntity.ok(mockResponse);
        when(restTemplate.getForEntity(url, Map.class)).thenReturn(responseEntity);

        ResponseEntity<Map> result = montageAPIService.makeAPICall(url);

        assertNotNull(result);
        assertEquals(mockResponse, result.getBody());
    }

}
