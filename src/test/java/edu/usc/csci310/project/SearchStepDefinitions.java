package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.*;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static org.junit.Assert.*;

public class SearchStepDefinitions {
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
    @Given("I am on the search page")
    public void iAmOnTheSearchPage(){
        driver.get(ROOT_URL+"Search");
    }

    @When("I enter {string} in the search bar")
    public void iEnterInTheSearchBar(String arg0) throws InterruptedException {
        //driver.findElement(By.xpath("//*[@id=\"searchBar\"]")).sendKeys(arg0);
        Thread.sleep(2000);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement searchBar = wait.until(ExpectedConditions.visibilityOf(driver.findElement(By.id("searchBar"))));
        searchBar.sendKeys(arg0);

    }

    @And("I press the search button")
    public void iPressTheSearchButton() {
        driver.findElement(By.xpath("/html/body/div[1]/div/div/div[2]/div[2]/div[2]/div/div[2]/form/button")).click();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        By movieDetailsSelector = By.id("movie-title");
        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(movieDetailsSelector, 9));
    }

    @When("I select {string} in the dropdown menu")
    public void iSelectInTheDropdownMenu(String arg0) {
        // Find the select element by its ID
        WebElement selectElement = driver.findElement(By.id("chooseFilter"));

        // Create a new Select object from the select element
        Select select = new Select(selectElement);

        // Select the option based on the provided argument
        switch (arg0) {
            case "title":
                select.selectByValue("movie");
                break;
            case "keyword":
                select.selectByValue("keyword");
                break;
            case "actor":
                select.selectByValue("person");
                break;
        }
    }

    @Then("I should see {int} results in the page")
    public void iShouldSeeResultsInThePage(int arg0) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        By movieDetailsSelector = By.id("movie-title");
        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(movieDetailsSelector, arg0 - 1));
        List<WebElement> movieDetailsList = driver.findElements(movieDetailsSelector);
        int actualResults = movieDetailsList.size();
        System.out.println("Total movie details count: " + actualResults);
        assertEquals(arg0, actualResults);
    }

    @And("I press the load more button")
    public void iPressTheLoadMoreButton() {
        driver.findElement(By.xpath("/html/body/div[1]/div/div/div[3]/button")).click();
    }

    @And("I press the enter key")
    public void iPressTheEnterKey() {
        driver.findElement(By.id("searchBar")).sendKeys(Keys.ENTER);
    }

    @And("I click on the {string} movie title")
    public void iClickOnTheMovieTitle(String arg0) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        By movieDetailsSelector = By.id("movie-title");
        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(movieDetailsSelector, 9));
        List<WebElement> movieDetailsList = driver.findElements(movieDetailsSelector);

        for (WebElement movie : movieDetailsList) {
            String movieTitle = movie.findElement(By.id("movie-name")).getText();
            if (movieTitle.contains(arg0)) {
                try {
                    wait.until(ExpectedConditions.elementToBeClickable(movie.findElement(By.id("movie-name")))).click();
                    break;
                } catch (ElementClickInterceptedException ignored) {
                }
            }
        }
    }

    @Then("I should be able to scroll through cast")
    public void iShouldBeAbleToScrollThroughCastIn() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        By overlayElementSelector = By.id("chakra-modal--body-:r0:");
        wait.until(ExpectedConditions.visibilityOfElementLocated(overlayElementSelector));
        driver.findElement(By.id("accordion-button-:r1:")).click();
        WebElement castList = driver.findElement(By.id("accordion-panel-:r1:"));
        Boolean isScrollable = (Boolean) ((JavascriptExecutor) driver).executeScript("return arguments[0].scrollHeight > arguments[0].clientHeight", castList);

        assertTrue("Cast list is scrollable", isScrollable);
    }

    @Then("I should not see {string} in the page")
    public void iShouldNotSeeInThePage(String arg0) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));
        By movieDetailsSelector = By.id("movie-title");
        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(movieDetailsSelector, 9));
        List<WebElement> movieDetailsList = driver.findElements(movieDetailsSelector);

        boolean foundMatch = false;
        for (WebElement movie : movieDetailsList) {
            String movieTitle = movie.findElement(By.id("movie-name")).getText();
            if (movieTitle.contains(arg0)) {
                foundMatch = true;
                break;
            }
        }
        assertFalse("Should see " + arg0 + " in the page", foundMatch);
    }

    @Then("I should see {string}, {string}, {string}, {string}, {string}, {string}, {string} in the overlay")
    public void iShouldSeeInTheOverlay(String arg0, String arg1, String arg2, String arg3, String arg4, String arg5, String arg6) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        By overlayElementSelector = By.id("chakra-modal--body-:r0:");
        wait.until(ExpectedConditions.visibilityOfElementLocated(overlayElementSelector));

        assertTrue("Should see " + arg0 + " in the overlay", driver.getPageSource().contains(arg0));
        assertTrue("Should see " + arg1 + " in the overlay", driver.getPageSource().contains(arg1));
        assertTrue("Should see " + arg2 + " in the overlay", driver.getPageSource().contains(arg2));
        assertTrue("Should see " + arg3 + " in the overlay", driver.getPageSource().contains(arg3));
        assertTrue("Should see " + arg4 + " in the overlay", driver.getPageSource().contains(arg4));
        assertTrue("Should see " + arg5 + " in the overlay", driver.getPageSource().contains(arg5));
        assertTrue("Should see " + arg6 + " in the overlay", driver.getPageSource().contains(arg6));

    }

    @Then("I should see {string} in the page")
    public void iShouldSeeInThePage(String arg0) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));
        By movieDetailsSelector = By.id("movie-title");
        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(movieDetailsSelector, 9));
        List<WebElement> movieDetailsList = driver.findElements(movieDetailsSelector);

        boolean foundMatch = false;
        for (WebElement movie : movieDetailsList) {
            String movieTitle = movie.findElement(By.id("movie-name")).getText();
            if (movieTitle.contains(arg0)) {
                foundMatch = true;
                break;
            }
        }
        assertTrue("Should see " + arg0 + " in the page", foundMatch);
    }

    @After
    public void after(){
        driver.quit();
    }
}
