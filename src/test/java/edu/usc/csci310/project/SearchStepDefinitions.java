package edu.usc.csci310.project;

import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import org.openqa.selenium.*;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static org.junit.Assert.*;

public class SearchStepDefinitions {
    private static final String ROOT_URL = "https://localhost:8080/";
    private static final String ROOT_URL_HTTP = "http://localhost:8080/";
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

    @Given("I am on the start page")
    public void iAmOnTheStartPage(){
        driver.get(ROOT_URL);
    }

    @When("I am logged in")
    public void iAmLoggedIn() {
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[2]/button")).click();
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[2]/div[1]/input")).sendKeys("user");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[2]/div[2]/input")).sendKeys("pass");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[2]/div[3]/input")).sendKeys("pass");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[2]/div[4]/input")).sendKeys("User");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[3]/button")).click();
        System.out.println(driver.getCurrentUrl());
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

    @And("I hover over the {string} movie title")
    public void iHoverOverTheMovieTitle(String arg0) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));

        // Wait for all movie titles to be visible
        List<WebElement> titles = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("movie-title")));

        // Find the desired movie title and hover over it
        for (WebElement currTitle : titles) {
            if (currTitle.getText().equals(arg0)) {
                Actions actions = new Actions(driver);
                actions.moveToElement(currTitle).perform();
                break;
            }
        }
    }

    @Then("I should see the hover buttons on the page")
    public void iShouldSeeTheHoverButtonsOnThePage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));
        By hoverButtonsSelector = By.cssSelector("[data-testid='hover-buttons']");
        WebElement hoverButtonsContainer = wait.until(ExpectedConditions.presenceOfElementLocated(hoverButtonsSelector));

        assertTrue("Hover buttons container is not displayed", hoverButtonsContainer.isDisplayed());
    }

    @And("I press purchase from the dollar sign hover button")
    public void iPressPurchaseFromTheDollarSignHoverButton() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));
        WebElement dollarButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("dollarButton")));
        dollarButton.click();
        WebElement purchaseButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("purchaseButton")));
        purchaseButton.click();
    }

    @Then("I should be redirected to a ticket purchasing website with a query of the movie title")
    public void iShouldBeRedirectedToATicketPurchasingWebsiteWithAQueryOfTheMovieTitle() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));
        wait.until(ExpectedConditions.numberOfWindowsToBe(2));

        String originalHandle = driver.getWindowHandle();

        for (String handle : driver.getWindowHandles()) {
            if (!handle.equals(originalHandle)) {
                driver.switchTo().window(handle);
                break;
            }
        }

        String expectedURL = "https://www.regmovies.com/search?query=Fight%20Club";
        String currentUrl = driver.getCurrentUrl();
        assertEquals(expectedURL, currentUrl);

        driver.switchTo().window(originalHandle);
    }

    @And("I go to the view all watchlist page")
    public void iGoToTheViewAllWatchlistPage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement searchNavButton = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/div[3]/button[2]"))));
        searchNavButton.click();
    }

    @And("I make one watchlist")
    public void iMakeOneWatchlist() {
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/button[1]")).click();
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/div/section/div[2]/div/input")).sendKeys("list");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/div/section/footer/button")).click();
    }

    @And("I add to the watchlist from the plus button")
    public void iAddToTheWatchlistFromThePlusButton() throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));
        WebElement addButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("addButton")));
        addButton.click();
        WebElement selectElement = driver.findElement(By.id("dropdown"));
        Select select = new Select(selectElement);
        select.selectByValue("1");
        driver.findElement(By.id("addToList")).click();
        Thread.sleep(2000);
        wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[2]/div[2]/div/div[2]/label[1]"))));
    }

    @Then("I should see one movie in the watchlist")
    public void iShouldSeeOneMovieInTheWatchlist() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));

        List<WebElement> titles = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("movie-name")));
        assertEquals(1, titles.size());
    }

    @And("I add to a new watchlist from the plus button")
    public void iAddToANewWatchlistFromThePlusButton() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));
        WebElement addButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("addButton")));
        addButton.click();
    }

    @Given("I am on the {string} page using HTTP")
    public void iAmOnThePageUsingHTTP(String arg0) {
        driver.get(ROOT_URL_HTTP+arg0);
    }


//    @After
//    public void after(){
//        driver.quit();
//    }
}
