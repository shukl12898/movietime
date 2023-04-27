package edu.usc.csci310.project;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.java.en.And;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.devtools.v85.database.Database;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import javax.xml.crypto.Data;
import java.time.Duration;

public class LoginStepDefinitions {

    private static final String ROOT_URL = "http://localhost:8080/";
    private WebDriver driver;

    @BeforeAll
    public static void beforeAllLogin() throws Exception {
        DatabaseManager db = new DatabaseManager();
        db.dropAllTables();
        db.setUp();
        System.out.println("Setting Up Cucumber Driver");
        System.setProperty("webdriver.http.factory", "jdk-http-client");
        WebDriverManager.chromedriver().setup();
    }


    @Before
    public void beforeLogin() {
        ChromeOptions options = new ChromeOptions();
        // options.addArguments("--headless");
        options.addArguments("--whitelisted-ips");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-extensions");
        driver = new ChromeDriver(options);

    }

    @After
    public void after(){
        driver.quit();
    }
    @Given("I am on the login page")
    public void iAmOnLogin() {
        driver.get(ROOT_URL);
    }

    @When("I enter {string} in the username box, login")
    public void iEnterUsername(String arg0) {

        try {
            DatabaseManager db = new DatabaseManager();
            db.createNewUser("oclavijo", "1234abcd", "Oscar");
        } catch (Exception e) {}

        driver.findElement(By.xpath("//*[@id=\"field-:r0:\"]")).sendKeys(arg0);
    }

    @And("I enter {string} in the password box, login")
    public void iEnterPassword(String arg0) {
        driver.findElement(By.xpath("//*[@id=\"field-:r1:\"]")).sendKeys(arg0);
    }

    @And("I click login")
    public void iClickLogin(){
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[1]/div/div[2]/div[3]/button")).click();
    }

    @Then("The page should display {string}")
    public void pageDisplays(String arg0){
        try{
            WebDriverWait wait = new WebDriverWait (driver, Duration.ofSeconds (2)) ;
        } catch(Exception e) {}
        String source = driver.getPageSource();
        assertTrue(source.contains(arg0));
    }

    @When("I press the Create Account button")
    public void clickOnCreateAccount() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[2]/button")).click();
    }

    @Then("I should be taken to the Create Account Page")
    public void shouldBeOnCreateAccount() {
        try{
            WebDriverWait wait = new WebDriverWait (driver, Duration.ofSeconds (2)) ;
        } catch(Exception e) {}
        assertEquals(
                "Create Account",
                driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[1]/div/div[2]/div[1]/h2")).getText());

    }

    @Then("Login is successful and I am on search page")
    public void loginSuccessful() {
        try{
            WebDriverWait wait = new WebDriverWait (driver, Duration.ofSeconds (2)) ;
            WebElement searchBttn =
                    wait.until(ExpectedConditions.elementToBeClickable(
                            driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/div[3]/button[1]"))));
            searchBttn.click();
        } catch(Exception e) {}
        assertEquals(
                "Search",
                driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div/div[1]/div[2]/div[1]/h2")).getText());

    }

}
