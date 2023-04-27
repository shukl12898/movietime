package edu.usc.csci310.project;

import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class MontageStepDefinition {

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
    public void before() {
        ChromeOptions options = new ChromeOptions ();
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver (options);
    }

    @And("I am on the view all watchlist page")
    public void iAmOnTheViewAllWatchlistPage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement watchlistNavButton = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[3]/button[2]"))));
        watchlistNavButton.click();
    }

    @When("I press the create montage button")
    public void iPressTheCreateMontageButton() {
        
    }

    @Then("I should be taken to a separate page which can navigate to the search and list page")
    public void iShouldBeTakenToASeparatePageWhichCanNavigateToTheSearchAndListPage() {
        
    }

    @And("I have a watchlist with {int} movie in it")
    public void iHaveAWatchlistWithMovieInIt() {
        
    }

    @When("I am taken to a separate page")
    public void iAmTakenToASeparatePage() {
    }

    @Then("I should see {int} overlapping images, with a visible white border, with each picture rotated a random amount between {int} and {int} degrees")
    public void iShouldSeeOverlappingImagesWithAVisibleWhiteBorderWithEachPictureRotatedARandomAmountBetweenAndDegrees() {
    }

    @And("I have a watchlist with {int} movies in it")
    public void iHaveAWatchlistWithMoviesInIt() {
        
    }

    @Then("I should see at least one image for each movie in the watchlist")
    public void iShouldSeeAtLeastOneImageForEachMovieInTheWatchlist() {
    }

    @Then("I should be taken to a separate page with a montage in less than {double} seconds")
    public void iShouldBeTakenToASeparatePageWithAMontageInLessThanSeconds() {
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

    @And("I create a new watchlist")
    public void iCreateANewWatchlist() {
        System.out.println(driver.getPageSource());
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/button[1]")).click();
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/div/section/div[2]/div/input")).sendKeys("list");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[3]/div/section/footer/button")).click();
    }

    @And("I go to the search page")
    public void iGoToTheSearchPage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement searchNavButton = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("//*[@id=\"root\"]/div[1]/div[3]/button[1]"))));
        searchNavButton.click();
    }

    @Given("I am on login page")
    public void iAmOnLoginPage() {
        driver.get(ROOT_URL);
    }

    @And("I add {int} movie")
    public void iAddMovie(int arg0) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement movieFilter = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[2]/div[2]/div/div[1]/label[1]"))));
        movieFilter.click();
        driver.findElement(By.id("searchBar")).sendKeys("a");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[2]/div[2]/div/div[2]/form/button")).click();

        // Wait for the movie titles to be loaded
        List<WebElement> titles = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("movie-title")));

        Actions actions = new Actions(driver);

        for (int i = 0; i < arg0; i++){
            WebElement currTitle = titles.get(i);
            actions.moveToElement(currTitle).perform();
            WebElement addButton = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[2]/div[2]/div/div/div[2]/button[2]"))));
            addButton.click();
            WebElement listSelect = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.id("/html/body[@class='chakra-ui-light']/div[@class='chakra-portal'][2]/div[3]/div[@class='chakra-modal__content-container css-1u2cvaz']/section[@id='chakra-modal-:r1n:']/div[@id='chakra-modal--body-:r1n:']/div[@class='chakra-select__wrapper css-42b2qy']/select[@class='chakra-select css-7p9xsp']"))));
            listSelect.click();
        }
    }

}
