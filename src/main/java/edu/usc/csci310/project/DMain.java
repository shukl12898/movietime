package edu.usc.csci310.project;

public class DMain {

    public static void main(String[] args) {
        System.out.println("Hello world");
        DatabaseManager db;
        try {
            db = new DatabaseManager();
        } catch (Exception e) {
            System.out.println("error");
            return;
        }

        try {
            db.createNewUser("oclavijo", "password", "oscar");
            db.createNewUser("devika", "password", "devika");
            db.createNewUser("akanksha", "password", "akanksha");
        } catch (Exception e ) {}
        System.out.println(db.getAllUsers(5));
     //   db.dropAllTables();
        //System.out.println(db.getAllUsers(5));
    }
}
