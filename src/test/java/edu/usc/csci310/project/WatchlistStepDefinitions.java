package edu.usc.csci310.project;

import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;

public class WatchlistStepDefinitions {
    private static final String ROOT_URL = "http://localhost:8080/";
    private WebDriver driver;

    @BeforeAll
    public static void beforeAll() {
        System.out.println("Setting Up Cucumber Driver");
        WebDriverManager.chromedriver().setup();
        System.setProperty("webdriver.http.factory", "jdk-http-client");
    }

    @Before
    public void before() {
        ChromeOptions options = new ChromeOptions();
//        options.addArguments("--headless");
        options.addArguments("--whitelisted-ips");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-extensions");
        options.addArguments("--disable-web-security");
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
    }

    @Given("I am on the {string} page")
    public void iAmOnTheSearchPage(String arg0){
        driver.get(ROOT_URL+arg0);
    }

    @When("I click to delete the watchlist")
    public void iClickToDeleteTheWatchlist() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[3]/div/div/div[3]/button")).click();
    }

    @When("I hover over the movie")
    public void iHoverOverTheMovie() {
        WebElement ele = driver.findElement(By.xpath("//*[@id=\"movie-name\"]"));
//Creating object of an Actions class
        Actions action = new Actions(driver);
//Performing the mouse hover action on the target element.
        action.moveToElement(ele).perform();
    }

    @When("I click on the Search Page header")
    public void iClickOnTheSearchPageHeader() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/div[3]/button[1]")).click();
    }

    @When("I click on the Watchlists Page header")
    public void iClickOnTheWatchlistsPageHeader() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/div[3]/button[2]")).click();
    }
}
