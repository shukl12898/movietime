Feature: Generate Suggestions
  Scenario: Have 7 movies to be shown for suggestion
    Given I am on endpoint MyWatchlist
    When I select "The Hunger Games" on "Action" Watchlist
    And I enter 7 on the textbox
    And I click the Generate button
    Then I should see 7 suggestions which shouldn't contain "The Hunger Games"

  Scenario: Hovering over the tooltip
    Given I am on endpoint MyWatchlist
    When I put my mouse on the question mark beside suggestion page
    Then I should see Maximum 10, Minimum 1

  Scenario: Choose two movies from different watchlists
    Given I am on endpoint MyWatchlist
    When I select "The Hunger Games" on "Action" Watchlist
    And I select "SMILE" on "Horror Watchlist
    And I enter 3 on the textbox
    And I click the Generate button
    Then I should see 3 movies related to 'The Hunger Games" AND "SMILE"

  Scenario:Enter a number that's bigger than 10
    Given I am on endpoint MyWatchlist
    When I enter 100 on the textbox
    Then I should see value too large

  Scenario:Enter a number that's less than 1
    Given I am on endpoint MyWatchlist
    When I enter 0 on the textbox
    Then I should see value too small

  Scenario: Create a new watchlist based on suggested movies
    Given I am on endpoint "Suggested movies"
    When I press the create new watchlist button from the list
    And I enter "Suggested for me" in the namebox
    Then I should see a new watchlist called "Suggested for me"

  Scenario: name a new watchlist that already exits
    Given I am on endpoint "Suggested movies"
    When I press the create new watchlist button from the list
    And I enter "action" in the namebox
    Then I should see "This name already exits"
