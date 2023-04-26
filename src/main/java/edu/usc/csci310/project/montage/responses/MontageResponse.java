package edu.usc.csci310.project.montage.responses;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MontageResponse {

    public HashMap<Integer, ArrayList<String>> getAllResults() {
        return allResults;
    }

    public static class Image {
        private int id;
        private String imagePath;

        public Image(int id, String path) {
            this.id = id;
            this.imagePath = path;
        }

        public int getID() {return id;}
        public String getImagePath() {return imagePath;}

    }

    private HashMap<Integer, ArrayList<String>> allResults;

    private ArrayList<Image> montageImages;

    public ArrayList<Image> getMontageImages() { return montageImages; }

    public void setAllResults(HashMap<Integer, ArrayList<String>> results) { this.allResults = results; }

    public void setMontageImages() {

        montageImages = new ArrayList<>();

        for (Map.Entry<Integer, ArrayList<String>> entry : allResults.entrySet()){
            int id = entry.getKey();
            ArrayList<String> values = entry.getValue();
            for (int i = 0; i < values.size(); i++){
                Image image = new Image(id, values.get(i));
                montageImages.add(image);
            }
        }

    }

}
