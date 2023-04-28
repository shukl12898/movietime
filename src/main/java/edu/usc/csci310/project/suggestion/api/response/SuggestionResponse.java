package edu.usc.csci310.project.suggestion.api.response;

import java.util.ArrayList;
import java.util.List;

public class SuggestionResponse {
    private List<Object> results = new ArrayList<>();

    public List<Object> getResults() {
        return results;
    }

    public void setResults(List<Object> results) {
        this.results = results;
    }
}
