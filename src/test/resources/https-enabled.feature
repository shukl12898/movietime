Feature: testing out the HTTPS required feature
  Scenario: open a page using HTTP
    Given I am on the search page using HTTP
    Then I should see "Bad Request" in the page
