package edu.usc.csci310.project.demo.steps;

import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ViewStepDefintions {
    private static final String ROOT_URL = "http://localhost:8080/";
    private WebDriver driver;

    @Before
    public void before() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--whitelisted-ips");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-extensions");
        driver = new ChromeDriver(options);
    }

    @When("I enter {string}")
    public void iClickOnTheIncrementCounterButton() {
        driver.findElement(By.id("incrementcounter")).click();
    }

    @Then("I should see an {string} watchlist and a {string} watchlist")
    public void iShouldSeeAnWatchlistAndAWatchlist(String arg0, String arg1) {
        assertEquals(driver.findElement(By.id("counter")).getText(), arg0);
    }
}
