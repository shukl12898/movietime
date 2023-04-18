Feature: testing out the movie details feature
  Scenario: open the page and click on a title
    Given I am on the search page
    When I enter "fight club" in the search bar
    And I press the search button
    And I click on the "Fight Club" movie title
    Then I should see "Fight Club", "Brad Pitt", "1999", "Drama", "David Fincher", "Regency Enterprises", "A ticking-time-bomb" in the overlay

  Scenario: open the page and don't click on any title
    Given I am on the search page
    When I enter "fight club" in the search bar
    And I press the search button
    Then I should not see "Brad Pitt" in the page

  Scenario: open the page and click on a title and scroll through cast
    Given I am on the search page
    When I enter "fight club" in the search bar
    And I press the search button
    And I click on the "Fight Club" movie title
    Then I should be able to scroll through cast