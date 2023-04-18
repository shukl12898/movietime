package edu.usc.csci310.project.credentials.api.responses;

public class CredentialsResponse {
    private int status;
    private String key;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
