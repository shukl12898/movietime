Feature: testing login functionality
  Scenario: an existing user logs in
    Given I am on the login page
    When I enter "oclavijo" in the username box, login
    And I enter "1234abcd" in the password box, login
    And I click login
    Then Login is successful and I am on search page

  Scenario: An existing user enters an incorrect password
    Given I am on the login page
    When I enter "oclavijo" in the username box, login
    And I enter "123" in the password box, login
    And I click login
    Then The page should display "Incorrect password."

  Scenario: A nonexisting username is entered
    Given I am on the login page
    When I enter "oscarc" in the username box, login
    And I enter "123abc" in the password box, login
    And I click login
    Then The page should display "Account not found."

  Scenario: I do not have an account, but choose to create one
    Given I am on the login page
    When I press the Create Account button
    Then I should be taken to the Create Account Page