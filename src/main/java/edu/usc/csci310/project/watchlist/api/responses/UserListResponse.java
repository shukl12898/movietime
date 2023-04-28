package edu.usc.csci310.project.watchlist.api.responses;

import edu.usc.csci310.project.UserModel;
import java.util.List;

public class UserListResponse {

    private List<UserModel> users;


    public List<UserModel> getUsers() {
        return users;
    }

    public void setUsers(List<UserModel> users) {
        this.users = users;
    }
}
