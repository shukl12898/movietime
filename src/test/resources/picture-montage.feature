Feature: testing out the picture montage feature
  Scenario: open the page and click on the create montage button
    Given I am on the view all watchlist page
    When I press the create montage button
    Then I should be taken to a separate page which can navigate to the search and list page

  Scenario: open the page and click on the create montage button for a watchlist of 1 movie
    Given I am on the view all watchlist page
    And I have a watchlist with 1 movie in it
    And I press the create montage button
    When I am taken to a separate page
    Then I should see 10 overlapping images, with a visible white border, with each picture rotated a random amount between -45 and 45 degrees

  Scenario: open the page and click on the create montage button for a watchlist of 5 movies
    Given I am on the view all watchlist page
    And I have a watchlist with 5 movies in it
    And I press the create montage button
    When I am taken to a separate page
    Then I should see at least one image for each movie in the watchlist

  Scenario: open the page and display montage quickly
    Given I am on the view all watchlist page
    When I press the create montage button
    Then I should be taken to a separate page with a montage in less than 1.5 seconds

