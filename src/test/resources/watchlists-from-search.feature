Feature: Watchlist functionality from the Search Page
  Scenario: Open the page and navigate to MyWatchlists Page
    Given I am on the "" page
    When I am logged in
    And I click on the Watchlists Page header
    Then I should see "Your Watchlists" simply on page

  Scenario: Open the page and add movie to new watchlist (New name)
    Given I am on the "" page
    When I am logged in
    And I enter "Fight Club" in the search bar
    And I press the search button
    And I should see "Fight Club" in the page
    And I hover over "Fight Club"
    And I click to add movie to a watchlist
    And I click new watchlist on modal
    And I enter "Action" in the list name
    And I click Done after the list name
    Then I should see "Valid list name!" in the page

  Scenario: Open the page and add movie to new watchlist (Used name)
    Given I am on the "Search" page
    When I enter "Fight Club" in the search bar
    And I press the search button
    And I hover over "Fight Club"
    And I click to add movie to a watchlist
    And I enter "Action" in the list name
    And I click Done after the list name
    Then I should see "Error: A watchlist with the same name already exists." in the page

  Scenario: Open the page and add movie to existing watchlist
    Given I am on the "Search" page
    When I enter "Fight Club" in the search bar
    And I press the search button
    And I hover over "Fight Club"
    And I click to add movie to a watchlist
    And I click existing watchlist
    And I select "Action"
    Then I should see "You've successfully added a movie to an existing watchlist!" in the page

  Scenario: Open the page and click Eye button of movie to see watchlists movie is on
    Given I am on the "Search" page
    When I enter "Fight Club" in the search bar
    And I press the search button
    And I hover over "Fight Club"
    And I click to the Eye button of the movie
    Then I should see "This movie is on watchlists:" in the page

  Scenario: Open the page and click Eye button of movie to see movie is on no watchlists
    Given I am on the "Search" page
    When I enter "Fight Club" in the search bar
    And I press the search button
    And I hover over "Fight Club"
    And I click to the Eye button of the movie
    Then I should see "This movie is not on any watchlists." in the page

