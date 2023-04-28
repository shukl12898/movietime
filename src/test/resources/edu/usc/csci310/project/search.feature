Feature: testing out the search function
  Scenario: open the page and search by movie
    Given I am on the home page
    When I create an account
    And I navigate to the search page
    And I enter "Fight" in the search bar with "movie" filter selected
    And I press the search button
    Then I should see "Fight Club" in the page

  Scenario: open the page and search by an actor
    Given I am on the home page
    When I create an account
    And I navigate to the search page
    And I enter "Harry" in the search bar with "person" filter selected
    And I press the search button
    Then I should see "Don't Worry Darling" in the page

  Scenario: open the page and search by keyword
    Given I am on the home page
    When I create an account
    And I navigate to the search page
    And I enter "Dog" in the search bar with "keyword" filter selected
    And I press the search button
    Then I should see "The Barnyard Brat" in the page

  Scenario: open the page and see 10 results
    Given I am on the home page
    When I create an account
    And I navigate to the search page
    And I enter "Harry" in the search bar with "movie" filter selected
    And I press the search button
    Then I should see 10 results in the page

  Scenario: open the page and load more results
    Given I am on the home page
    When I create an account
    And I navigate to the search page
    And I enter "Harry" in the search bar with "movie" filter selected
    And I press the search button
    And I press the load more button
    Then I should see 20 results in the page

  Scenario: open the page and search using enter key
    Given I am on the home page
    When I create an account
    And I navigate to the search page
    And I enter "Fight" in the search bar with "movie" filter selected
    And I press the enter key
    Then I should see "Fight Club" in the page


  Scenario: open the page and search without selecting a year
    Given I am on the home page
    When I create an account
    And I navigate to the search page
    And I enter "Harry" in the search bar with "movie" filter selected
    And I press the search button
    Then I should see "Harry Potter and the Philosopher's Stone" and "Harry Potter and the Deathly Hallows: Part 2" on the page

  Scenario: open the page and search with a chosen start year
    Given I am on the home page
    When I create an account
    And I navigate to the search page
    And I input "2002" in the start year field
    And I enter "Harry" in the search bar with "movie" filter selected
    And I press the search button
    Then I should not see "Harry Potter and the Philosopher's Stone" in the page

  Scenario: open the page and search with a chosen end year
    Given I am on the home page
    When I create an account
    And I navigate to the search page
    And I input "2010" in the end year field
    And I enter "Harry" in the search bar with "movie" filter selected
    And I press the search button
    Then I should not see "Harry Potter and the Deathly Hallows: Part 2" in the page

  Scenario: open the page and search with chosen start year and end year
    Given I am on the home page
    When I create an account
    And I navigate to the search page
    And I input "2002" in the start year field
    And I input "2010" in the end year field
    And I enter "Harry" in the search bar with "movie" filter selected
    And I press the search button
    Then I should not see "Harry Potter and the Philosopher's Stone" or "Harry Potter and the Deathly Hallows: Part 2" in the page

  Scenario: Go from search page to watchlists page
    Given I am on the home page
    When I create an account
    And I navigate to the search page
    And I navigate to the watchlist page
    Then I am on the watchlist page
