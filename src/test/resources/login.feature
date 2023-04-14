Feature: testing login functionality
  Scenario: an existing user logs in.
    Given I am on the login page
    When I enter "oclavijo" in the username box
    And I enter "1234abcd" in the password box
    And I click submit
    Then My display name, "Oscar" should populate

  Scenario: An existing user enters an incorrect password
    Given I am on the login page
    When I enter "oclavijo" in the username box
    And I enter "123" in the password box
    And I click submit
    Then The page should display "incorrect password"

  Scenario: A nonexisting username is entered
    Given I am on the login page
    When I enter "oscarc" in the username box
    And I enter "123abc" in the password box
    And I click submit
    Then the page should display "Username not found"

  Scenario: I do not have an account, but choose to create one
    Given I am on the login page
    When I press the Create Account button
    Then I should be taken to the Create Account Page
