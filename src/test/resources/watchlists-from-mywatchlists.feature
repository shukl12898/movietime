Feature: Watchlist functionality from the MyWatchlists Page
  Scenario: Open the page and click on a movie for details
    Given I am on the "MyWatchlists" page
    When I click on the "Fight Club" movie title
    Then I should see {string}, {string}, {string}, {string}, {string}, {string}, {string} in the overlay

  Scenario: Open the page and remove a movie from a watchlist (Sure)
    Given I am on the "MyWatchlists" page
    When I hover over the movie
    And I click to remove the movie
    And I confirm the removal
    Then I should see {string} in the page

  Scenario: Open the page and remove a movie from a watchlist (Cancel)
    Given I am on the "MyWatchlists" page
    When I hover over the movie
    And I click to remove the movie
    And I cancel the removal
    Then I should see {string} in the page

  Scenario: Open the page and move a movie to new list (New name)
    Given I am on the "MyWatchlists" page
    When I hover over the movie
    And I click to move the movie to new list
    And I enter a new name
    Then I should see {string} in the page

  Scenario: Open the page and move a movie to new list (Used name)
    Given I am on the "MyWatchlists" page
    When I hover over the movie
    And I click to move the movie to new list
    And I enter a used name
    Then I should see {string} in the page

  Scenario: Open the page and move a movie to existing list
    Given I am on the "MyWatchlists" page
    When I hover over the movie
    And I click to move the movie to existing list
    And I choose the "Action" list
    Then I should see {string} in the page

  Scenario: Open the page and copy a movie to new list (New name)
    Given I am on the "MyWatchlists" page
    When I hover over the movie
    And I click to copy the movie to new list
    And I enter a new name
    Then I should see {string} in the page

  Scenario: Open the page and copy a movie to new list (Used name)
    Given I am on the "MyWatchlists" page
    When I hover over the movie
    And I click to copy the movie to new list
    And I enter a used name
    Then I should see {string} in the page

  Scenario: Open the page and copy a movie to existing list
    Given I am on the "MyWatchlists" page
    When I hover over the movie
    And I click to move the movie to existing list
    And I choose the "Action" list
    Then I should see {string} in the page

  Scenario: Open the page and copy a movie to new PUBLIC list
    Given I am on the "MyWatchlists" page
    When I hover over the movie
    And I click to copy the movie to new list
    And I enter a new name
    And I mark the list as public
    Then I should see {string} in the page

  Scenario: Open the page and copy a movie to new PRIVATE list
    Given I am on the "MyWatchlists" page
    When I hover over the movie
    And I click to copy the movie to new list
    And I enter a new name
    And I mark the list as private
    Then I should see {string} in the page

  Scenario: Open the page and delete watchlist (Sure)
    Given I am on the "MyWatchlists" page
    When I click to delete the watchlist
    And I click to confirm the deletion
    Then I should see "Successfully deleted." in the page

  Scenario: Open the page and delete watchlist (Cancel)
    Given I am on the "MyWatchlists" page
    When I click to delete the watchlist
    And I click to cancel the deletion
    Then I should see "Deletion cancelled." in the page

  Scenario: Open the page and rename watchlist (New Name)
    Given I am on the "MyWatchlists" page
    When I click to rename the watchlist
    And I enter a new name to rename
    And I click Rename
    Then I should see "Successfully renamed." in the page

  Scenario: Open the page and rename watchlist (Used Name)
    Given I am on the "MyWatchlists" page
    When I click to rename the watchlist
    And I enter a used name to rename
    And I click Rename
    Then I should see "Your Watchlists" in the page

  Scenario: Open the page and navigate to Search Page
    Given I am on the "MyWatchlists" page
    When I click on the Search Page header
    Then I should see "Search here" in the page