package edu.usc.csci310.project;

import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
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
//
//    @BeforeAll
//    public static void beforeAll() {
//        System.out.println("Setting Up Cucumber Driver");
//        WebDriverManager.chromedriver().setup();
//        System.setProperty("webdriver.http.factory", "jdk-http-client");
//    }

//    @Before
//    public void before() {
//        ChromeOptions options = new ChromeOptions();
////        options.addArguments("--headless");
//        options.addArguments("--whitelisted-ips");
//        options.addArguments("--no-sandbox");
//        options.addArguments("--disable-extensions");
//        options.addArguments("--disable-web-security");
//        options.addArguments("--remote-allow-origins=*");
//        driver = new ChromeDriver(options);
//    }

    @Before
    public void before() throws Exception {
        ChromeOptions options = new ChromeOptions ();
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver (options);
        DatabaseManager db = new DatabaseManager();
        db.dropAllTables();
    }

    @Given("I am on the search page")
    public void iAmOnTheSearchPage(){
        driver.get(ROOT_URL+"Search");
    }

    @And("I enter {string} in the search bar with {string} filter selected")
    public void iEnterInTheSearchBarWithFilterSelected(String arg0, String arg1) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));
        System.out.println(driver.getCurrentUrl());
        System.out.println(driver.getPageSource());
        if (arg1.equals("movie")){
            WebElement movieFilter = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[2]/div[2]/div/div[2]/label[1]"))));
            movieFilter.click();
        }
        if (arg1.equals("keyword")){
            WebElement keywordFilter = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[2]/div[2]/div/div[2]/label[2]"))));
            keywordFilter.click();
        }
        if (arg1.equals("person")){
            WebElement personFilter = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[2]/div[2]/div/div[2]/label[3]"))));
            personFilter.click();
        }

        driver.findElement(By.id("searchBar")).sendKeys(arg0);
    }

    @And("I press the search button")
    public void iPressTheSearchButton() {
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[2]/div[2]/div/div[3]/form/button")).click();
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
    public void iClickOnTheMovieTitle(String arg0) throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));

        List<WebElement> titles = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("movie-title-name")));

        for (WebElement currTitle : titles) {
            if (currTitle.getText().equals(arg0)) {
                currTitle.click();
                Thread.sleep(2000);
                return;
            }
        }

    }

    @Then("I should be able to scroll through cast")
    public void iShouldBeAbleToScrollThroughCastIn() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        By overlayElementSelector = By.id("overlay-content");
        wait.until(ExpectedConditions.visibilityOfElementLocated(overlayElementSelector));
        driver.findElement(By.id("accordion-button-:rb:")).click();
        WebElement castList = driver.findElement(By.id("accordion-panel-:rb:"));
        Boolean isScrollable = (Boolean) ((JavascriptExecutor) driver).executeScript("return arguments[0].scrollHeight > arguments[0].clientHeight", castList);

        assertTrue("Cast list is scrollable", isScrollable);
    }

    @Then("I should not see {string} in the page")
    public void iShouldNotSeeInThePage(String arg0) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));
        By overlaySelector = By.className("overlay-content");
        wait.until(ExpectedConditions.invisibilityOfElementLocated(overlaySelector));

        String pageText = driver.getPageSource();
        boolean foundMatch = pageText.contains(arg0);

        assertFalse("Should not see " + arg0 + " in the page", foundMatch);
    }

    @Then("I should see {string}, {string}, {string}, {string}, {string}, {string}, {string} in the overlay")
    public void iShouldSeeInTheOverlay(String arg0, String arg1, String arg2, String arg3, String arg4, String arg5, String arg6) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        By overlayElementSelector = By.id("overlay-content");
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

    @Given("I am on the home page")
    public void iAmOnTheHomePage() {
        driver.get(ROOT_URL);
    }

    @When("I create an account")
    public void iCreateAnAccount() {
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[2]/button")).click();
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[2]/div[1]/input")).sendKeys("user");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[2]/div[2]/input")).sendKeys("pass");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[2]/div[3]/input")).sendKeys("pass");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[2]/div[4]/input")).sendKeys("User");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[3]/button")).click();
        System.out.println(driver.getCurrentUrl());
    }

    @And("I navigate to the search page")
    public void iNavigateToTheSearchPage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement searchNavButton = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/div[3]/button[1]"))));
        searchNavButton.click();
    }

    @And("I click on the {string} movie title again")
    public void iClickOnTheMovieTitleAgain(String arg0) throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));

        By overlaySelector = By.className("overlay-content");
        wait.until(ExpectedConditions.invisibilityOfElementLocated(overlaySelector));

        List<WebElement> titles = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("movie-title-name")));

        for (WebElement currTitle : titles) {
            if (currTitle.getText().equals(arg0)) {
                currTitle.click();
                Thread.sleep(2000);
                return;
            }
        }
    }

//    @After
//    public void after(){
//        driver.quit();
//    }
}
