Feature: testing out the search function
  Scenario: open the page and search
    Given I am on the search page
    When I enter "Don't Worry Darling" in the search bar
    And I press the search button
    Then I should see "Don't Worry Darling" on the page

  Scenario: open the page and search by an actor
    Given I am on the search page
    When I select "actor" in the dropdown menu
    And I enter "Harry Styles" in the search bar
    And I press the search button
    Then I should see "Don't Worry Darling" on the page

  Scenario: open the page and search by keyword
    Given I am on the search page
    When I select "keyword" in the dropdown menu
    And I enter "drama" in the search bar
    And I press the search button
    Then I should see "Interstellar" on the page

  Scenario: open the page and search by title
    Given I am on the search page
    When I select "title" in the dropdown menu
    And I enter "Don't Worry Darling" in the search bar
    And I press the search button
    Then I should see "Don't Worry Darling" on the page

  Scenario: open the page and see 10 results
    Given I am on the search page
    When I select "title" in the dropdown menu
    And I enter "Don't Worry Darling" in the search bar
    And I press the search button
    Then I should see 10 results in the page

  Scenario: open the page and load more results
    Given I am on the search page
    When I select "title" in the dropdown menu
    And I enter "Don't Worry Darling" in the search bar
    And I press the search button
    And I press the load more button
    Then I should see 20 results in the page

  Scenario: open the page and search using enter key
    Given I am on the search page
    When I enter "Don't Worry Darling" in the search bar
    And I press the enter key
    Then I should see "Don't Worry Darling" in the page

  Scenario: open the page and search without selecting a year
    Given I am on the search page
    When I enter "Harry" in the search bar
    And I press the search button
    Then I should see "Harry Potter and the Philosopher's Stone" and "Harry Potter and the Deathly Hallows: Part 2" on the page

  Scenario: open the page and search with a chosen start year
    Given I am on the search page
    When I input "2002" in the start year field
    And I enter "Harry" in the search bar
    And I press the search button
    Then I should not see "Harry Potter and the Philosopher's Stone" on the page

  Scenario: open the page and search with a chosen end year
    Given I am on the search page
    When I input "2010" in the end year field
    And I enter "Harry" in the search bar
    And I press the search button
    Then I should not see "Harry Potter and the Deathly Hallows: Part 2" on the page

  Scenario: open the page and search with chosen start year and end year
    Given I am on the search page
    When I input "2002" in the start year field
    And I input "2010" in the end year field
    And I press the search button
    Then I should not see "Harry Potter and the Philosopher's Stone" or "Harry Potter and the Deathly Hallows: Part 2" on the page

  Scenario: open the page and hover over a search result
    Given I am on the search page
    When I enter "Harry" in the search bar
    And I press the search button
    And I hover over the title "Harry Potter and the Philosopher's Stone"
    Then I should see a plus button, a eye button, and a dollar button

  Scenario: Hover over a search result to add to watchlist
    Given I am on the search page
    When I enter "Harry" in the search bar
    And I press the search button
    And I hover over the title "Harry Potter and the Philosopher's Stone"
    And I press the plus button
    And I select my "Magic" watchlist
    Then I should see "Harry Potter and the Philosopher's Stone has been added to the Magic watchlist" on the page

  Scenario: Hover over a search result to add to watchlist that already has the movie in it
    Given I am on the search page
    When I enter "Harry" in the search bar
    And I press the search button
    And I hover over the title "Harry Potter and the Philosopher's Stone"
    And I press the plus button
    And I select my "Magic" watchlist
    Then I should see "Harry Potter and the Philosopher's Stone is already in the Magic watchlist" on the page

  Scenario: Hover over a search result to see which other user's watchlists have it
    Given I am on the search page
    When I enter "Harry" in the search bar
    And I press the search button
    And I hover over the title "Harry Potter and the Philosopher's Stone"
    And I press the eye button
    Then I should see "Other watchlists with this movie" on the page

    #Figure out how to have additional use cases for when no other watch lists have it, >0,
    #only see public ones

  Scenario: Hover over a search result to buy free tickets
    Given I am on the search page
    When I enter "Harry" in the search bar
    And I press the search button
    And I hover over the title "Harry Potter and the Philosopher's Stone"
    And I press the dollar button
    Then I should see "Congrats! You just got free tickets for Harry Potter and the Philosopher's Stone"

  Scenario: Go from search page to watchlists page
    Given I am on the search page
    When I click on the watchlists button in the navigation bar
    Then I should be on the MyWatchlists page









