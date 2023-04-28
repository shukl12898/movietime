Feature: testing the security requirements of all pages
  Scenario: Timeout from Search Page
    Given I am logged in, s
    When I navigate to the search page, s
    And I am inactive for more than 60 seconds
    Then I am on the login page, s
  Scenario: Timeout from Watchlist Page
    Given I am logged in, s
    When I navigate to the MyWatchlist page, s
    And I am inactive for more than 60 seconds
    Then I am on the login page, s
  Scenario: Timeout from Picture Montage Page
    Given I am logged in, s
    When I navigate to the MyWatchlist page, s
    And I click on the create montage button for an existing watchlist
    And I am on the montage page
    And I am inactive for more than 60 seconds
    Then I am on the login page,s

  Scenario: Timeout from Suggestions Page
    Given I am logged in, s
    When I navigate to the MyWatchlist page, s
    And I click on the Get Suggestions button
    And I select a movie from a watchlist
    And I input the number of suggestions to create
    And I click on the Generate Selections button
    And I am on the suggestions page
    And I am inactive for more than 60 seconds
    Then I am on the login page, s

  Scenario: Logged in user can do search functionality
    Given I am on the home page ,s
    When I login,s
    And I navigate to the search page, s
    Then I am on the search page, s

  Scenario: Logged in user can do watchlist functionality
    Given I am on the home page ,s
    When I login,s
    And I navigate to the watchlist page, s
    Then I am on the watchlist page , s

  Scenario: Not logged in user cant do search functionality
    Given I am on the home page ,s
    And I navigate to the search page, s
    Then I am on the home page, s

  Scenario: Not logged in user cant do search functionality
    Given I am on the home page ,s
    And I navigate to the watchlist page, s
    Then I am on the home page, s

  Scenario: Failed log in three times
    Given I am on the login page, s
    And I fail to login 3 times within one minute,s
    Then I am locked for 30 seconds, s












