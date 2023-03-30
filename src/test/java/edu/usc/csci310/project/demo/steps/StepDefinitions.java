package edu.usc.csci310.project.demo.steps;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.After;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.Assert.assertTrue;

public class StepDefinitions {

    private static final String ROOT_URL = "http://localhost:8080/";
    private final WebDriver driver = new ChromeDriver();

    @Given("I am on the home page")
    public void iamOnTheHomePage() {driver.get(ROOT_URL);}

    @When("I click on the title")
    public void iHoverOverTheTitle(){
        driver.findElement(By.id("title")).click();
    }

    @Then("I should see {string} in the page")
    public void iShouldSeeInThePage(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0));
    }
}
