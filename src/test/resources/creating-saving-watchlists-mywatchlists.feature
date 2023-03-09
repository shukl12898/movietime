Feature: Testing out the creating/saving watchlist features of the MyWatchlists page
  Scenario: Open the page and add a movie to a new watchlist
    Given I am on the MyWatchlists page
    When I hover over the "Fight Club" movie in the "action" watchlist
    And I click on add to new watchlist
    And I name the watchlist "intense"
    And I mark the watchlist as "private"
    Then I should see "You've created a new private watchlist named "intense": Fight Club" on the page

  Scenario: Open the page and move a movie from one watchlist to another
    Given I am on the MyWatchlists page
    When I hover over the "Fight Club" movie in the "action" watchlist
    And I click on move to existing watchlist
    And I click on "intense" watchlist
    Then "action" watchlist should not contain "Fight Club" and "intense" watchlist should contain "Fight Club"

  Scenario: Open the page and copy a movie from one watchlist to another
    Given I am on the MyWatchlists page
    When I hover over the "Fight Club" movie in the "action" watchlist
    And I click on copy to existing watchlist
    And I click on "intense" watchlist
    Then "action" watchlist should contain "Fight Club" and "intense" watchlist should contain "Fight Club"