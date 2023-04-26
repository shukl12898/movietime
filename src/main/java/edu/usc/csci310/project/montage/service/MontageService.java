package edu.usc.csci310.project.montage.service;
import edu.usc.csci310.project.montage.responses.MontageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MontageService {
    @Value("${tmdb.apiKey}")
    private String apiKey;

    private final MontageAPIService service;

    @Autowired
    public MontageService(MontageAPIService service) {
        this.service = service;
    }

    public MontageResponse getImages(ArrayList<Integer> ids) {

        if (ids == null){
            throw new RuntimeException();
        }

        MontageResponse response = new MontageResponse();

        HashMap<Integer, ArrayList<String>> results = new HashMap<>();

        for (int i = 0; i < ids.size(); i++){
            Integer id = ids.get(i);
            String url = "https://api.themoviedb.org/3/movie/" + id + "/images?api_key=" + apiKey;
            System.out.println("Sending request to URL: " + url);
            ResponseEntity<Map> responseEntity = service.makeAPICall(url);
            Map<String, Object> responseMap = responseEntity.getBody();
            ArrayList backdrops = (ArrayList) responseMap.get("backdrops");
            ArrayList allPaths = new ArrayList();
            for (int j = 0; j < backdrops.size(); j++){
                LinkedHashMap image = (LinkedHashMap) backdrops.get(j);
                String path = "https://image.tmdb.org/t/p/w500" + image.get("file_path");
                allPaths.add(path);
            }
            results.put(id, allPaths);
        }

        response.setAllResults(results);
        response.setMontageImages();

        return response;
    }
}
