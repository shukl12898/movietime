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
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

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
    public void before() throws Exception {
        ChromeOptions options = new ChromeOptions ();
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver (options);
        DatabaseManager db = new DatabaseManager();
        db.dropAllTables();
    }

    @And("I am on the view all watchlist page")
    public void iAmOnTheViewAllWatchlistPage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement watchlistNavButton = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[1]/div[3]/button[2]"))));
        watchlistNavButton.click();
    }

    @When("I press the create montage button")
    public void iPressTheCreateMontageButton() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement montageButton = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[2]/div/div/div[3]/div[2]/button[3]"))));
        montageButton.click();
    }

    @Then("I should be taken to a separate page which can navigate to the search and list page")
    public void iShouldBeTakenToASeparatePageWhichCanNavigateToTheSearchAndListPage() {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(60));
        wait.until(ExpectedConditions.urlContains("Montage"));
        assertTrue("Expected URL to contain Montage", driver.getCurrentUrl().contains("Montage"));

        WebElement watchlistNavButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/div[1]/div[1]/div[3]/button[2]")));
        assertNotNull("Expected watchlistNavButton to be present and clickable", watchlistNavButton);
        watchlistNavButton.click();
        wait.until(ExpectedConditions.urlContains("MyWatchlists"));
        assertTrue("Expected URL to contain watchlist", driver.getCurrentUrl().contains("MyWatchlists"));

        driver.navigate().back();

        WebElement searchNavButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"root\"]/div[1]/div[3]/button[1]")));
        assertNotNull("Expected searchNavButton to be present and clickable", searchNavButton);
        searchNavButton.click();
        wait.until(ExpectedConditions.urlContains("Search"));
        assertTrue("Expected URL to contain search", driver.getCurrentUrl().contains("Search"));
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
    public void iAddMovie(int arg0) throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(120));
        WebElement movieFilter = wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[2]/div[2]/div/div[2]/label[1]"))));
        movieFilter.click();
        driver.findElement(By.id("searchBar")).sendKeys("harry");
        driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[2]/div[2]/div/div[3]/form/button")).click();

        List<WebElement> titles = wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.id("movie-title")));

        Actions actions = new Actions(driver);

        for (int i = 0; i < arg0; i++){
            WebElement currTitle = titles.get(i);
            actions.moveToElement(currTitle).perform();
            WebElement addButton = wait.until(ExpectedConditions.elementToBeClickable(currTitle.findElement(By.id("addButton"))));
            addButton.click();
            WebElement selectElement = driver.findElement(By.id("dropdown"));
            Select select = new Select(selectElement);
            select.selectByValue("1");
            driver.findElement(By.id("addToList")).click();
            Thread.sleep(2000);
            wait.until(ExpectedConditions.elementToBeClickable(driver.findElement(By.xpath("/html/body/div[1]/div[2]/div/div[1]/div[2]/div[2]/div/div[2]/label[1]"))));
        }
    }

    @Then("I should see at least {int} non overlapping images, with a visible white border, with each picture rotated a random amount between {int} and {int} degrees")
    public void iShouldSeeAtLeastNonOverlappingImagesWithAVisibleWhiteBorderWithEachPictureRotatedARandomAmountBetweenAndDegrees(int arg0, int arg1, int arg2) {
        // Wait until at least arg0 images with the "img" tag are present
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        List<WebElement> images = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("img")));

        // Verify that there are at least arg0 images
        assertTrue(images.size() >= arg0);

        // Verify each image has a white border and is rotated between -45 and 45 degrees
        for (WebElement image : images) {
            // Verify the white border
            String borderStyle = image.getCssValue("border-style");
            String borderColor = image.getCssValue("border-color");
            assertTrue(borderStyle.equals("solid") && borderColor.equals("rgb(255, 255, 255)"));

            // Verify the rotation
            String transform = image.getCssValue("transform");
            if (!transform.equals("none")) {
                double rotation = getRotation(transform);
                assertTrue(rotation >= arg1 && rotation <= arg2);
            }
        }
    }

    // Helper function to parse the rotation angle from a CSS transform matrix
    private double getRotation(String transform) {
        String[] matrix = transform.substring(transform.indexOf('(') + 1, transform.indexOf(')')).split(",");
        double a = Double.parseDouble(matrix[0]);
        double b = Double.parseDouble(matrix[1]);
        double rotation = Math.atan2(b, a);
        return Math.toDegrees(rotation);
    }

    @Then("I should see at least one image for each of the {int} movies in the watchlist")
    public void iShouldSeeAtLeastOneImageForEachOfTheMoviesInTheWatchlist(int arg0) {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        List<WebElement> images = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.tagName("img")));

        Set<String> movieIds = new HashSet<>();
        for (WebElement image : images) {
            String altText = image.getAttribute("alt");
            String movieId = altText.substring(6);
            movieIds.add(movieId);
        }

        assertTrue(String.format("Expected to see at least %d different movies, but found only %d", arg0, movieIds.size()),
                movieIds.size() >= arg0);
    }

//    @After
//    public void after(){
//        driver.quit();
//    }

}
