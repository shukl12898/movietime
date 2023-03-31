Feature: Generate Suggestions
  Scenario: Have 7 movies to be shown for suggestion
    Given I am on endpoint "Watchlist"
    When I select "The Hunger Games" on "Action" Watchlist
    And I enter 7 on the textbox
    And I click the Generate button
    Then I should see 7 similar movies suggested and it should not contain "The Hunger Games" itself

  Scenario: Hovering over the tooltip
    Given I am on endpoint "Watchlist"
    When I put my mouth on the question mark beside suggestion page
    Then I should see "Enter number of movies to suggest, maximum 10 movies"

  Scenario: Choose two movies from different watchlists
    Given I am on endpoint "Watchlist"
    When I select "The Hunger Games" on "Action" Watchlist
    And I select "SMILE" on "Horror Watchlist
    And I enter 3 on the textbox
    And I click the Generate button
    Then I should see 3 movies related to 'The Hunger Games" AND "SMILE"



