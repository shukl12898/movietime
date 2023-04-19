Feature: Comparing watchlists with other users
  Scenario: A user tries to compare a private watchlist
    Given I am on the MyWatchlists page
    When I hover over a watchlist name
    And I click on the compare watchlist button
    And the watchlist is marked private
    Then I should see “Private watchlists cannot be compared” on the page

  Scenario: A user compares a public watchlist
    Given I am on the MyWatchlists page
    When I hover over a watchlist name
    And I click on the compare watchlist button
    And the watchlist is marked public
    And I select "user B" from the drop down menu of users
    And I select user B's "Action" watchlist
    And I name the new watchlist "Our Action Watchlist"
    Then I should see a new "Our Action Watchlist" on the page with movies from both watchlists
