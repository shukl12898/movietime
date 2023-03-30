package edu.usc.csci310.project.login.api.responses;

public class LoginResponse {

    private String displayName;
    private int userId;
    public String getDisplayName() {
        return displayName;
    }
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
