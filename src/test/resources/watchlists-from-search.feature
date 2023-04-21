Feature: Watchlist functionality from the Search Page
  Scenario: Open the page and add movie to new watchlist (New name)
    Given I am on the "Search" page
    When I click to add a movie to a watchlist
    And I click new watchlist
    And I enter "Action"
    Then I should see "You've successfully added a movie to a new watchlist!" on the page

  Scenario: Open the page and add movie to new watchlist (Used name)
    Given I am on the "Search" page
    When I click to add a movie to a watchlist
    And I click new watchlist
    And I enter "Action"
    Then I should see "Error: A watchlist with the same name already exists." on the page

  Scenario: Open the page and add movie to existing watchlist
    Given I am on the "Search" page
    When I click to add a movie to a watchlist
    And I click existing watchlist
    And I select "Action"
    Then I should see "You've successfully added a movie to an existing watchlist!" on the page

  Scenario: Open the page and click Eye button of movie to see watchlists movie is on
    Given I am on the "Search" page
    When I click to the Eye button of a movie
    Then I should see "This movie is on watchlists:" on the page

  Scenario: Open the page and click Eye button of movie to see movie is on no watchlists
    Given I am on the "Search" page
    When I click to the Eye button of a movie
    Then I should see "This movie is not on any watchlists." on the page

  Scenario: Open the page and navigate to MyWatchlists Page
    Given I am on the "Search" page
    When I click on "My Watchlists" in the header
    Then I should see "My Watchlists" on the page