Feature: Testing out the creating/saving watchlist features of the search page
  Scenario: Open the page and add a searched movie to a new watchlist
    Given I am on the search page
    When I enter "Fight Club"
    And I click search
    And I hover over the "Fight Club" result
    And I click on add to new watchlist
    And I name the watchlist "action"
    And I mark the watchlist as "private"
    Then I should see "You've created a new public watchlist named "action": Fight Club" on the page

  Scenario: Open the page and add a searched movie to a new watchlist with same name
    Given I am on the search page
    When I enter "Fight Club"
    And I click search
    And I hover over the "Fight Club" result
    And I click on add to new watchlist
    And I name the watchlist "action"
    And I mark the watchlist as "public"
    Then I should see "A watchlist with the name "action" already exists

  Scenario: Open the page and add a searched movie to an existing watchlist
    Given I am on the search page
    When I enter "Fight Club"
    And I click search
    And I hover over the "Fight Club" result
    And I click on add to existing watchlist
    And I click on "action" watchlist
    Then I should see "You've added "Fight Club" to "action"" on the page

  Scenario: Open the page and try to add a searched movie to an existing watchlist with the same movie
    Given I am on the search page
    When I enter "Fight Club"
    And I click search
    And I hover over the "Fight Club" result
    And I click on add to existing watchlist
    And I click on "action" watchlist
    Then I should see "Sorry. The "action" watchlist already contains "Fight Club"" on the page
