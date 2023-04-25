package edu.usc.csci310.project;

import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class WatchlistStepDefinitions {
    private static final String ROOT_URL = "http://localhost:8080/";
    private WebDriver driver;

    @Before
    public void before() {
        ChromeOptions options = new ChromeOptions ();
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver (options);
    }

    /*
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
    */
    @Given("I am on the {string} page")
    public void iAmOnPage(String arg0) {
        driver.get(ROOT_URL + arg0);
    }

    @When("I click to delete the watchlist")
    public void iClickToDeleteTheWatchlist() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[3]/div/div/div[3]/button")).click();
    }

    @And("I click on the Search Page header")
    public void iClickOnTheSearchPageHeader() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/div[3]/button[1]")).click();
    }

    @And("I click on the Watchlists Page header")
    public void iClickOnTheWatchlistsPageHeader() {
       //driver.findElement(By.cssSelector("[name='watchlistHeader']")).click();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[1]/div[3]/button[2]")))).click();
    }

    @And("I hover over {string}")
    public void iHoverOver(String arg0) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        By movieDetailsSelector = By.id("movie-title");
        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(movieDetailsSelector, 9));
        List<WebElement> movieDetailsList = driver.findElements(movieDetailsSelector);

        for (WebElement movie : movieDetailsList) {
            String movieTitle = movie.findElement(By.id("movie-name")).getText();
            if (movieTitle.contains(arg0)) {
                try {
                    wait.until(ExpectedConditions.elementToBeClickable(movie.findElement(By.id("movie-name"))));
                    Actions actions = new Actions(driver);
                    actions.moveToElement(movie).build().perform();
                    break;
                } catch (ElementClickInterceptedException ignored) {
                }
            }
        }


    }

    @And("I click to add movie to a watchlist")
    public void iClickToAddMovieToAWatchlist() {
        //Through search
        //Webdriver wait?

        driver.findElement(By.className("chakra-button css-um367a")).click();

    }

    @And("I click new watchlist on modal")
    public void iClickNewWatchlistOnModal() {
        driver.findElement(By.id("createNewListButton")).click();
    }

    @And("I enter {string} in the list name")
    public void iEnterInTheListName(String arg0) {
        driver.findElement(By.id("newListTextBox")).sendKeys(arg0);
    }

    @And("I click Done after the list name")
    public void iClickDoneAfterTheListName() {
        driver.findElement(By.id("DoneButton")).click();
    }

    @When("I am logged in")
    public void iAmLoggedIn() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[3]/button")).click();
        driver.findElement(By.xpath("//*[@id=\"field-:r2:\"]")).sendKeys("user");
        driver.findElement(By.xpath("//*[@id=\"field-:r3:\"]")).sendKeys("pass");
        driver.findElement(By.xpath("//*[@id=\"field-:r4:\"]")).sendKeys("pass");
        driver.findElement(By.xpath("//*[@id=\"field-:r5:\"]")).sendKeys("User");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[2]/div[3]/button")).click();
    }
}
