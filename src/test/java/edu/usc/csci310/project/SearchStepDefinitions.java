package edu.usc.csci310.project;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import org.openqa.selenium.WebDriver;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.After;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;

public class SearchStepDefinitions {
    private static final String ROOT_URL = "https://localhost:8080/";
    private final WebDriver driver = new ChromeDriver();
    @Given("I am on the search page")
    public void iAmOnTheSearchPage(){
        driver.get(ROOT_URL+"Search");
    }

    @Given("I am on the {string} page")
    public void iAmOnTheSearchPage(String arg0){
        driver.get(ROOT_URL+arg0);
    }

    @When("I enter {string} in the search bar")
    public void iEnterInTheSearchBar(String arg0) {
        driver.findElement(By.id("searchBar")).sendKeys(arg0);
    }

    @And("I press the search button")
    public void iPressTheSearchButton() {

    }

    @Then("I should see {string} on the page")
    public void iShouldSeeOnThePage() {

    }

    @When("I select {string} in the dropdown menu")
    public void iSelectInTheDropdownMenu(String arg0) {
        switch (arg0){
            case "Movie Title":
                driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div[1]/div/select/option[1]")).click();
                break;
            case "Keyword":
                driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div[1]/div/select/option[2]")).click();
                break;
            case "Actor/Actress":
                driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div[1]/div/select/option[3]")).click();
                break;
        }
    }

    @Then("I should see {int} results in the page")
    public void iShouldSeeResultsInThePage() {

    }

    @And("I press the load more button")
    public void iPressTheLoadMoreButton() {
        driver.findElement(By.xpath("/html/body/div/div/div/button[2]")).click();
    }

    @And("I press the enter key")
    public void iPressTheEnterKey() {
    }

    @And("I click on the {string} movie title")
    public void iClickOnTheMovieTitle() {

    }

    @Then("I should be able to scroll through cast in {string}")
    public void iShouldBeAbleToScrollThroughCastIn() {
    }

    @Then("I should not see {string} in the page")
    public void iShouldNotSeeInThePage() {
    }

    @After
    public void after(){
        driver.quit();
    }

    @Then("I should see {string}, {string}, {string}, {string}, {string}, {string}, {string} in the overlay")
    public void iShouldSeeInTheOverlay() {
    }

    @Then("I should see {string} in the page")
    public void iShouldSeeInThePage() {
    }
}
