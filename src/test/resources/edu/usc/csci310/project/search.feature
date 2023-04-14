Feature: testing out the search function
  Scenario: open the page and search
    Given I am on the search page
    When I enter "Don't Worry Darling" in the search bar
    And I press the search button
    Then I should see "Don't Worry Darling" in the page

  Scenario: open the page and search by an actor
    Given I am on the search page
    When I select "actor" in the dropdown menu
    And I enter "Harry Styles" in the search bar
    And I press the search button
    Then I should see "Don't Worry Darling" in the page

  Scenario: open the page and search by keyword
    Given I am on the search page
    When I select "keyword" in the dropdown menu
    And I enter "drama" in the search bar
    And I press the search button
    Then I should see "Interstellar" in the page

  Scenario: open the page and search by title
    Given I am on the search page
    When I select "title" in the dropdown menu
    And I enter "Don't Worry Darling" in the search bar
    And I press the search button
    Then I should see "Don't Worry Darling" in the page

  Scenario: open the page and see 10 results
    Given I am on the search page
    When I select "title" in the dropdown menu
    And I enter "Ocean" in the search bar
    And I press the search button
    Then I should see 10 results in the page

  Scenario: open the page and load more results
    Given I am on the search page
    When I select "title" in the dropdown menu
    And I enter "Ocean" in the search bar
    And I press the search button
    And I press the load more button
    Then I should see 20 results in the page

  Scenario: open the page and search using enter key
    Given I am on the search page
    When I enter "Don't Worry Darling" in the search bar
    And I press the enter key
    Then I should see "Don't Worry Darling" in the page
