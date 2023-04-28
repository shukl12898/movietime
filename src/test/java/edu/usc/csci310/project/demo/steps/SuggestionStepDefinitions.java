package edu.usc.csci310.project.demo.steps;

import static org.junit.jupiter.api.Assertions.assertEquals;

import edu.usc.csci310.project.DatabaseManager;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.github.bonigarcia.wdm.WebDriverManager;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.Keys;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class SuggestionStepDefinitions {
    private static final String ROOT_URL = "http://localhost:8080/";

    private WebDriver driver;

    private WebDriverWait wait;



    @Before
    public void before() throws Exception {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
        DatabaseManager db = new DatabaseManager();
        db.dropAllTables();
    }


    @Given("I am on endpoint MyWatchlist")
    public void iAmOnEndpointWatchlist() {
        // handle create account and login
        driver.get(ROOT_URL);
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[2]/button")).click();
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[2]/div[1]/input")).sendKeys("user");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[2]/div[2]/input")).sendKeys("pass");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[2]/div[3]/input")).sendKeys("pass");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[2]/div[4]/input")).sendKeys("User");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div[1]/div/div[2]/div[3]/button")).click();
        System.out.println(driver.getCurrentUrl());

        //
        wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement watchlistNavButton = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[1]/div/div[3]/button[2]"))));
        watchlistNavButton.click();
    }


    @When("I enter {int} on the textbox")
    public void iEnterOnTheTextbox(int arg0) {
        WebElement SuggestionInputBox = driver.findElement(By.id("SuggestionInputBox"));
        SuggestionInputBox.clear();
        SuggestionInputBox.sendKeys(Integer.toString(arg0));
        SuggestionInputBox.sendKeys(Keys.ENTER);
    }


    @Then("I should see value too large")
    public void iShouldSeeValueTooLarge() {
        WebElement SuggestionInputBox = driver.findElement(By.id("SuggestionInputBox"));
        String errorMessage = (String) ((JavascriptExecutor) driver).executeScript(
                "return arguments[0].validationMessage;", SuggestionInputBox);

        assertEquals("Value must be less than or equal to 10.", errorMessage);

    }

    @Then("I should see value too small")
    public void iShouldSeeValueTooSmall() {
        WebElement SuggestionInputBox = driver.findElement(By.id("SuggestionInputBox"));
        String errorMessage = (String) ((JavascriptExecutor) driver).executeScript(
                "return arguments[0].validationMessage;", SuggestionInputBox);

        assertEquals("Value must be greater than or equal to 1.", errorMessage);
    }


    @When("I put my mouse on the question mark beside suggestion page")
    public void iPutMyMouseOnTheQuestionMarkBesideSuggestionPage() {
        WebElement tooltipButton = driver.findElement(By.id("TooltipButton"));
        Actions actions = new Actions(driver);
        actions.moveToElement(tooltipButton).perform();
    }


    @Then("I should see Maximum {int}, Minimum {int}")
    public void iShouldSeeMaximumMinimum(int arg0, int arg1) {
        String expectedTooltipText = "Maximum " + arg0 + ", Minimum " + arg1;
        By tooltipButtonSelector = By.id("TooltipButton");
        wait.until(ExpectedConditions.visibilityOfElementLocated(tooltipButtonSelector));

        JavascriptExecutor js = (JavascriptExecutor) driver;
        String tooltipText = (String) js.executeScript("return document.querySelector('#TooltipButton').getAttribute('aria-describedby')");

        WebElement tooltipContent = driver.findElement(By.id(tooltipText));
        String contentText = tooltipContent.getText();

        assert contentText.equals(expectedTooltipText) : "Expected tooltip text to be '" + expectedTooltipText + "', but found '" + contentText + "'";
    }

    @When("I press Suggestion button")
    public void iPressSuggestionButton() {
        wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement getSuggestion = driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/button[1]"));
        getSuggestion.click();
    }

    @Then("I should see {int} related movies without selected ones")
    public void iShouldSeeRelatedMoviesWithoutSelectedOnes(int arg0) {



    }

    @And("I select {string} on {string} Watchlist")
    public void iSelectOnWatchlist(String arg0, String arg1) {



        //go back to watchlist, click get suggestion button, and select movie






    }

    @And("I click the Generate button")
    public void iClickTheGenerateButton() {
        WebElement generate = driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/button[1]"));
        generate.click();

    }

    @Given("I am on endpoint Suggested movies")
    public void iAmOnEndpointSuggestedMovies() {


    }

    @When("I press the create new watchlist button from the list")
    public void iPressTheCreateNewWatchlistButtonFromTheList() {

    }

    @And("I enter {string} in the namebox")
    public void iEnterInTheNamebox(String arg0) {

    }

    @Then("I should see a new watchlist called {string}")
    public void iShouldSeeANewWatchlistCalled(String arg0) {
    }

    @Then("I should see {string}")
    public void iShouldSee(String arg0) {
    }

    @And("I add some movies to watchlists")
    public void iAddSomeMoviesToWatchlists() {
        /*
        //I am on watchlist page right now





        //press the create a New List button
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/button[2]")).click();


        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/div/section/div[2]/div/input")).sendKeys("Action");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/div/section/footer/button")).click();

        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/div/section/div[2]/div/input")).sendKeys("Horror");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/div/section/footer/button")).click();

        //Go to search, click movie title, type in the search, and Add, go back to watchlist
        driver.findElement(By.xpath("/html/body/div[1]/div[1]/div/div[3]/button[1]")).click();

        wait = new WebDriverWait(driver, Duration.ofSeconds(120));
        WebElement movieFilter = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[2]/div[2]/div/div[2]/label[1]"))));
        movieFilter.click();
        driver.findElement(By.id("searchBar")).sendKeys("The Hunger Games");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[2]/div[2]/div/div[3]/form/button")).click();

         */



    }



//    @After
//    public void tearDown() {
//        if (driver != null) {
//            driver.quit();
//        }
//    }
}