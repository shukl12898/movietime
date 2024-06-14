# MovieTime Information

The **documentation** branch is for the group's Scrum process documentation.  **main** is the primary branch for development work.

## Brief Architecture Overview
### React (Frontend)
All frontend code is located in `/site`. `package.json` contains frontend build configuration and a list of packages needed in order to run. You will need to download Node.js from https://nodejs.org/en/download/ to run the frontend independently. Top-level pages are in `/site/src/pages` and other components are in `/site/src/components`.

### SpringBoot (Backend)
All backend code is located in `/src/main`. 

## Running Tests and Checking Coverage for Java & JavaScript

All unit tests will run with `mvn test`  and the coverage output directory will be `target/site/jacoco` for  Java code and `site/coverage` for JavaScript code.

### Frontend
To run just frontend tests:
- First, navigate in terminal/command prompt to `/site`.
- Run `npm run test` to run Jest tests
  - This will ask you to select an option: `a` will run all tests, `f` will run failed tests, etc
- Run `npm run test -- --coverage --watchAll=false` to run Jest coverage tests. Note the extra `--` is required.

## Running App Locally During Development

To run the app in the development environment, first run `mvn compile` and then `mvn spring-boot:run` The app will now be available on `http://localhost:8080`

### Frontend only
- Navigate to `/site` in terminal/command prompt
- Run `npm start`. Note that this will auto rebuild/refresh when you make changes to the frontend.

### Backend only
- Run the main method in `SpringBootAPI.java`

## Running Acceptance Tests & Configuring a Subset of Features to Run

To run the project's acceptance tests, either `mvn integration-test` or `mvn verify` can be run.  Cucumber can be configured to run a subset of the features by modifying the `cucumber.properties` file in the `src/test/resources` folder
