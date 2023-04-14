package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

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
        options.addArguments("--headless");
        options.addArguments("--whitelisted-ips");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-extensions");
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
    }
    @Given("I am on the search page")
    public void iAmOnTheSearchPage(){
        driver.get(ROOT_URL+"Search");
    }

    @When("I enter {string} in the search bar")
    public void iEnterInTheSearchBar(String arg0) {
        driver.findElement(By.id("searchBar")).sendKeys(arg0);
    }

    @And("I press the search button")
    public void iPressTheSearchButton() {

    }

    @When("I select {string} in the dropdown menu")
    public void iSelectInTheDropdownMenu(String arg0) {
        switch (arg0){
            case "Movie Title":
                driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div[1]/div/select/option[1]")).click();
                break;
            case "Keyword":
                driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div[1]/div/select/option[2]")).click();
                break;
            case "Actor/Actress":
                driver.findElement(By.xpath("/html/body/div/div/div/div[1]/div[1]/div/select/option[3]")).click();
                break;
        }
    }

    @Then("I should see {int} results in the page")
    public void iShouldSeeResultsInThePage() {

    }

    @And("I press the load more button")
    public void iPressTheLoadMoreButton() {
        driver.findElement(By.xpath("/html/body/div/div/div/button[2]")).click();
    }

    @And("I press the enter key")
    public void iPressTheEnterKey() {
    }

    @And("I click on the {string} movie title")
    public void iClickOnTheMovieTitle() {

    }

    @Then("I should be able to scroll through cast in {string}")
    public void iShouldBeAbleToScrollThroughCastIn() {
        WebElement castList = driver.findElement(By.className("scrollContainer"));
        Boolean isScrollable = (Boolean) ((JavascriptExecutor) driver).executeScript("return arguments[0].scrollHeight > arguments[0].clientHeight", castList);

        assertTrue(isScrollable);
    }

    @Then("I should not see {string} in the page")
    public void iShouldNotSeeInThePage(String arg0) {
        boolean contains = driver.getPageSource().contains(arg0);
        assertFalse(contains);
    }

    @Then("I should see {string}, {string}, {string}, {string}, {string}, {string}, {string} in the overlay")
    public void iShouldSeeInTheOverlay(String arg0, String arg1, String arg2, String arg3, String arg4, String arg5, String arg6) {
        assertTrue(driver.getPageSource().contains(arg0));
        assertTrue(driver.getPageSource().contains(arg1));
        assertTrue(driver.getPageSource().contains(arg2));
        assertTrue(driver.getPageSource().contains(arg3));
        assertTrue(driver.getPageSource().contains(arg4));
        assertTrue(driver.getPageSource().contains(arg5));
        assertTrue(driver.getPageSource().contains(arg6));
    }

    @Then("I should see {string} in the page")
    public void iShouldSeeInThePage(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @After
    public void after(){
        driver.quit();
    }

}
