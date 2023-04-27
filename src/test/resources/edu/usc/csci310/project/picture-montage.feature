Feature: testing out the picture montage feature
  Scenario: open the page and click on the create montage button
    Given I am on login page
    When I am logged in
    And I am on the view all watchlist page
    And I create a new watchlist
    And I go to the search page
    And I add 1 movie
    And I am on the view all watchlist page
    And I press the create montage button
    Then I should be taken to a separate page which can navigate to the search and list page

  Scenario: open the page and click on the create montage button for a watchlist of 1 movie
    Given I am on login page
    When I am logged in
    And I am on the view all watchlist page
    And I create a new watchlist
    And I go to the search page
    And I add 1 movie
    And I am on the view all watchlist page
    And I press the create montage button
    Then I should see at least 10 non overlapping images, with a visible white border, with each picture rotated a random amount between -45 and 45 degrees

  Scenario: open the page and click on the create montage button for a watchlist of 5 movies
    Given I am on login page
    When I am logged in
    And I am on the view all watchlist page
    And I create a new watchlist
    And I go to the search page
    And I add 5 movie
    And I am on the view all watchlist page
    And I press the create montage button
    Then I should see at least one image for each of the 5 movies in the watchlist


