package edu.usc.csci310.project;

public class UserModel {
    private int user_id;
    private String displayName;

    public UserModel(int user_id, String displayName) {
        this.user_id = user_id;
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
