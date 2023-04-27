package edu.usc.csci310.project;
import static org.junit.jupiter.api.Assertions.assertEquals;

import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.java.en.And;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class CreateAccountStepDefinitions {

    private static final String ROOT_URL = "http://localhost:8080/";
    private WebDriver driver;

    @BeforeAll
    public static void beforeAll() {
        System.out.println("Setting Up Cucumber Driver");
        System.setProperty("webdriver.http.factory", "jdk-http-client");
        WebDriverManager.chromedriver().setup();

    }

    @Before
    public void before() {
        ChromeOptions options = new ChromeOptions();
       // options.addArguments("--headless");
        options.addArguments("--whitelisted-ips");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-extensions");
        driver = new ChromeDriver(options);

    }

    @Given("I am on the Create Account page")
    public void iAmOnCreateAccount() {
        driver.get(ROOT_URL);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[2]/button")).click();
    }
    @When("I enter {string} in the username box")
    public void iEnterInTheUsernameBox(String arg0) {
        driver.findElement(By.xpath("//*[@id=\"field-:r2:\"]")).sendKeys(arg0);
    }
    @And("I enter {string} in the password box")
    public void iEnterInThePwBox(String arg0) {
        driver.findElement(By.xpath("//*[@id=\"field-:r3:\"]")).sendKeys(arg0);
    }
    @And("I enter {string} in the confirm password box")
    public void iConfirmPassword(String arg0) {
        driver.findElement(By.xpath("//*[@id=\"field-:r4:\"]")).sendKeys(arg0);
    }

    @And("I click submit button")
    public void iClickSubmit() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div[1]/div/div[2]/div[3]/button")).click();
    }

    @Then("I should be on the search page")
    public void iAmOnSearch(){
        assertEquals(
                "Create Account",
                driver.findElement(By.xpath("//*[@id=\"root\"]/div[2]/div/div[1]/div[2]/div[1]/h2")).getText());

    }
}
