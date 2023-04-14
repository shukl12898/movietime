Feature: Testing User Create Account Functionality
  Scenario: A new user tries to create an account
    Given I am on the Create Account page
    When I enter "devika" in the username box
    And I enter "1234 in the password box
    And I enter "1234" in the confirm password box
    And I click submit button
    Then I should be on the search page

  Scenario: An existing user tries to create an account
    Given I am on the Create Account page
    When I enter "devika" in the username box
    And I enter "1234" in the password box
    And I enter "1234" in the confirm password box
    Then I should see "This username already exists. Enter a different one." on the page

  Scenario: A new user tries to create an account, but fails password confirmation
    Given I am on the Create Account page
    When I enter "akanksha" in the username box
    And I enter "1234" in the password box
    And I enter "5678" in the confirm password box
    And I click the submit button
    Then I should see "Your passwords do not match. Please try again."

  Scenario: A new user tries to create an account, but then cancels
    Given I am on the Create Account page
    When I enter "akanksha" in the username box
    And I enter "1234" in the password box
    And I enter "1234" in the confirm password box
    And I click the cancel button
    Then I should be on the log in page




