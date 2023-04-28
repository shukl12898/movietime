Feature: testing out the HTTPS required feature
  Scenario: open the Home page using HTTP
    Given I am on the start page
    When I create an account
    And I am on the "home" page using HTTP
    Then I should see "Bad Request" on the page

  Scenario: open the Login page using HTTP
    Given I am on the start page
    When I create an account
    And I am on the "login" page using HTTP
    Then I should see "Bad Request" on the page

  Scenario: open the MyWatchlists page using HTTP
    Given I am on the home page
    When I create an account
    And I am on the "mywatchlists" page using HTTP
    Then I should see "Bad Request" on the page

  Scenario: open the Profile page using HTTP
    Given I am on the home page
    When I create an account
    And I am on the "profile" page using HTTP
    Then I should see "Bad Request" on the page

  Scenario: open the Search page using HTTP
    Given I am on the home page
    When I create an account
    And I am on the "search" page using HTTP
    Then I should see "Bad Request" on the page
