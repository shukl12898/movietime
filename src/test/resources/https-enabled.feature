Feature: testing out the HTTPS required feature
  Scenario: open the Montage page using HTTP
    Given I am on the start page
    When I click advanced
    And I create an account
    And I am on the "montage" page using HTTP
    Then I should see "Bad Request" simply on page

  Scenario: open the Login page using HTTP
    Given I am on the start page
    When I click advanced
    And I create an account
    And I am on the "login" page using HTTP
    Then I should see "Bad Request" simply on page

  Scenario: open the MyWatchlists page using HTTP
    Given I am on the start page
    When I click advanced
    And I create an account
    And I am on the "MyWatchlists" page using HTTP
    Then I should see "Bad Request" simply on page

  Scenario: open the Profile page using HTTP
    Given I am on the start page
    When I click advanced
    And I create an account
    And I am on the "profile" page using HTTP
    Then I should see "Bad Request" simply on page

  Scenario: open the Search page using HTTP
    Given I am on the start page
    When I click advanced
    And I create an account
    And I am on the "search" page using HTTP
    Then I should see "Bad Request" simply on page
