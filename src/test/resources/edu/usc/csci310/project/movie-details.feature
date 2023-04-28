Feature: testing out the movie details feature
#  Scenario: open the page and click on a title
#    Given I am on the home page
#    When I create an account
#    And I navigate to the search page
#    And I enter "fight club" in the search bar with "movie" filter selected
#    And I press the search button
#    And I click on the "Fight Club" movie title
#    Then I should see "Fight Club", "Brad Pitt", "1999", "Drama", "David Fincher", "Regency Enterprises", "A ticking-time-bomb" in the overlay
#
#  Scenario: open the page and don't click on any title
#    Given I am on the home page
#    When I create an account
#    And I navigate to the search page
#    When I enter "fight club" in the search bar with "movie" filter selected
#    And I press the search button
#    And I click on the "Fight Club" movie title
#    And I click on the "Fight Club" movie title again
#    Then I should not see "Brad Pitt" in the page
#
#  Scenario: open the page and click on a title and scroll through cast
#    Given I am on the home page
#    When I create an account
#    And I navigate to the search page
#    And I enter "fight club" in the search bar with "movie" filter selected
#    And I press the search button
#    And I click on the "Fight Club" movie title
#    Then I should be able to scroll through cast
#
#  Scenario: open the page and hover over a search result
#    Given I am on the home page
#    When I create an account
#    And I navigate to the search page
#    And I enter "fight club" in the search bar with "movie" filter selected
#    And I press the search button
#    And I hover over the "Fight Club" movie title
#    Then I should see the hover buttons on the page
#
#  Scenario: open the page, open the details and hover over a search result
#    Given I am on the home page
#    When I create an account
#    And I navigate to the search page
#    And I enter "fight club" in the search bar with "movie" filter selected
#    And I press the search button
#    And I click on the "Fight Club" movie title
#    And I hover over the "Fight Club" movie title
#    Then I should see the hover buttons on the page
#
#  Scenario: open the page, hover over a search result, click on the dollar icon and be redirected to a movie ticket page
#    Given I am on the home page
#    When I create an account
#    And I navigate to the search page
#    And I enter "fight club" in the search bar with "movie" filter selected
#    And I press the search button
#    And I hover over the "Fight Club" movie title
#    And I press purchase from the dollar sign hover button
#    Then I should be redirected to a ticket purchasing website with a query of the movie title
#
#  Scenario: open the page, hover over a search result, click on the add icon and add movie to an existing watchlist
#    Given I am on the home page
#    When I create an account
#    And I go to the view all watchlist page
#    And I make one watchlist
#    And I navigate to the search page
#    And I enter "fight club" in the search bar with "movie" filter selected
#    And I press the search button
#    And I hover over the "Fight Club" movie title
#    And I add to the watchlist from the plus button
#    And I go to the view all watchlist page
#    Then I should see one movie in the watchlist
#
#  Scenario: open the page, hover over a search result, click on the eye icon and see all lists the movie is in
#    Given I am on the home page
#    When I create an account
#    And I go to the view all watchlist page
#    And I make one watchlist
#    And I navigate to the search page
#    And I enter "fight club" in the search bar with "movie" filter selected
#    And I press the search button
#    And I hover over the "Fight Club" movie title
#    And I add to the watchlist from the plus button
#    And I go to the view all watchlist page
#    And I navigate to the search page
#    And I enter "fight club" in the search bar with "movie" filter selected
#    And I press the search button
#    And I hover over the "Fight Club" movie title
#    And I press the eye sign hover button
#    Then I should see the watchlist title on the page

  Scenario: open the page, open the details and click on a cast member
    Given I am on the home page
    When I create an account
    And I go to the view all watchlist page
    And I make one watchlist
    And I navigate to the search page
    And I enter "This is us" in the search bar with "movie" filter selected
    And I press the search button
    And I click on the "One Direction: This Is Us" movie title
    And I click on "Harry Styles" in the cast list
    Then I should see "Don't Worry Darling" in the new results

##  Scenario: open the page, open the details and click on a genre

