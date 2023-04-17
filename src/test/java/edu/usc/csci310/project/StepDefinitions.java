package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.Assert.assertTrue;

public class StepDefinitions {
    private static final String ROOT_URL = "http://localhost:3000/";
    private final WebDriver driver = new ChromeDriver();


    @Given("I am on the manychoices page")
    public void iAmOnTheManyChoicesPage() {
        driver.get(ROOT_URL+"many-choices");
    }

    @When("I enter {string}")
    public void iEnter(String arg0) {
        driver.findElement(By.id("name")).sendKeys(arg0);
        //Check lecture
    }
    @And("I press the submit button")
    public void iPressTheSubmitButton() {
        driver.findElement(By.xpath("/html/body/form/p[2]/input")).click();
    }

    @And("I press the color submit button")
    public void iPressTheColorSubmitButton() {
        driver.findElement(By.xpath("/html/body/form/p[4]/input")).click();
    }

    @When("I select {string}")
    public void iSelect(String arg0) {
        driver.findElement(By.id(arg0)).click();
    }

    @And("I enter {string} reason")
    public void iEnterReason(String arg0) {
        driver.findElement(By.id("reason")).sendKeys(arg0);
    }

    @And("I press the inputs submit button")
    public void iPressTheInputsSubmitButton() {
        driver.findElement(By.id("submitBtn")).click();
    }

    @Given("I am on the search page")
    public void iAmOnTheSearchPage() {
        driver.get(ROOT_URL+"Search");
    }

    @And("I click Load More")
        public void iClickLoadMore() {
        driver.findElement(By.id("LoadMore")).click();
    }

    @Given("I am on the MyWatchlists page")
    public void iAmOnTheMyWatchlistsPage() {
        driver.get(ROOT_URL+"MyWatchlists");
    }

    @Then("I should see {string} in the page")
    public void iShouldSeeInThePage(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0));
    }
    @After
    public void after() {
        driver.quit();
    }
}
