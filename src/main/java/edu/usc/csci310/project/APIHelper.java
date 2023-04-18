package edu.usc.csci310.project;
import com.google.gson.Gson;
import java.io.FileReader;
import java.nio.file.Paths;
import java.nio.file.Path;

public class APIHelper {

    public static String getAPIKey() throws Exception{
        Path path = Paths.get("src/main/resources/local-preferences.json");
        FileReader reader = new FileReader(path.toFile());

        Gson gson = new Gson();
        LocalPreferences localPref = gson.fromJson(reader, LocalPreferences.class);
        System.out.println(localPref.getKey());
        return localPref.getKey();
    }

}
