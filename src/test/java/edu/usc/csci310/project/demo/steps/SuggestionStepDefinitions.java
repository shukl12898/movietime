package edu.usc.csci310.project.demo.steps;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

    private final WebDriver driver;

    private WebDriverWait wait;

    public SuggestionStepDefinitions() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(7));
    }


    @Given("I am on endpoint MyWatchlist")
    public void iAmOnEndpointWatchlist() {
        driver.get(ROOT_URL+"MyWatchlists");
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

}
