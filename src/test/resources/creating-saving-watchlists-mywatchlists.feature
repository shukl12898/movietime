Feature: creating/saving watchlist on MyWatchlists page
  Scenario: Open the page and add a movie to a new watchlist
    Given I am on the MyWatchlists page
    When I hover over the "Fight Club" movie in the "action" watchlist
    And I click on add to new watchlist
    And I name the watchlist "intense"
    And I mark the watchlist as "private"
    Then I should see a new private watchlist named "intense" on the page

  Scenario: Open the page and add a movie to a new watchlist with same name
    Given I am on the MyWatchlists page
    When I hover over the "Fight Club" movie in the "action" watchlist
    And I click on add to new watchlist
    And I name the watchlist "intense"
    And I mark the watchlist as "private"
    Then I should see "A watchlist with the name "intense" already exists

  Scenario: Open the page and move a movie from one watchlist to another
    Given I am on the MyWatchlists page
    When I hover over the "Fight Club" movie in the "action" watchlist
    And I click on move to existing watchlist
    And I click on "intense" watchlist
    Then "action" watchlist should not contain "Fight Club"

  Scenario: Move a movie from one watchlist to another with same movie
    Given I am on the MyWatchlists page
    When I hover over the "Fight Club" movie in the "action" watchlist
    And I click on move to existing watchlist
    And I click on "intense" watchlist
    Then I should see an error message on the page

  Scenario: Open the page and copy a movie from one watchlist to another
    Given I am on the MyWatchlists page
    When I hover over the "Fight Club" movie in the "action" watchlist
    And I click on copy to existing watchlist
    And I click on "intense" watchlist
    Then "action" has "Fight Club" and "intense" has "Fight Club"

  Scenario: Open the page and try to copy a movie from one watchlist to another with same movie
    Given I am on the MyWatchlists page
    When I hover over the "Fight Club" movie in the "action" watchlist
    And I click on copy to existing watchlist
    And I click on "intense" watchlist
    Then I should see an error message on the page
    
