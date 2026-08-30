# Kitchen Sink [![renovate-app badge][renovate-badge]][renovate-app] [![semantic-release][semantic-image]][semantic-url]

This is an example app used to showcase [Cypress.io](https://www.cypress.io/) End-to-End (E2E) testing. The application demonstrates the use of most [Cypress API commands](https://on.cypress.io/api). Additionally, this example app is configured to run E2E tests on various CI platforms.

Several workflows demonstrate the CI use of [Cypress Docker images](https://github.com/cypress-io/cypress-docker-images), which provide convenient, pre-configured compatible environments for Cypress.

The original [Cypress tests](https://github.com/cypress-io/cypress-example-kitchensink/tree/master/cypress/e2e) are also heavily commented.

To see the Kitchen Sink application and view the [Cypress API commands](https://on.cypress.io/api) demonstrated by the app, visit [example.cypress.io](https://example.cypress.io/).

For a full reference of the Cypress documentation, go to [docs.cypress.io](https://docs.cypress.io/).

For an example payment application demonstrating real-world usage of Cypress.io End-to-End (E2E) testing, see the [cypress-io/cypress-realworld-app](https://github.com/cypress-io/cypress-realworld-app) repository.

[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovatebot
[renovate-app]: https://renovatebot.com/
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

---

# Custom Playwright Automation

This repository also includes additional test automation for the Todo application using **Playwright with TypeScript**.

The automation implementation includes:

- Playwright with TypeScript
- Page Object Model
- Reusable Playwright fixtures
- Independent test execution
- Test scenarios based on a Gherkin test plan
- Todo task creation, completion, deletion and filtering tests
- Allure reporting
- Docker support for running the application

## Project Structure

```text
├── pages/
│   └── TodoPage.ts
│
├── tests/
│   ├── fixtures/
│   │   └── todo.fixture.ts
│   ├── task-creation.spec.ts
│   ├── task-completion.spec.ts
│   ├── task-deletion.spec.ts
│   ├── task-filtering.spec.ts
│   └── ...
│
├── test-plan/
│   └── todo-test-plan.feature
│
├── Dockerfile
├── docker-compose.yml
├── playwright.config.ts
└── README.md
```

---

# Getting Started

## Clone the Repository

```bash
git clone https://github.com/janevski1/cypress-example-kitchensink.git
cd cypress-example-kitchensink
```

## Install Dependencies

Install the project dependencies:

```bash
npm ci
```

Install the required Playwright browsers:

```bash
npx playwright install
```

---

# Running the Application

To start the application manually:

```bash
npm start
```

The application will be available at:

```text
http://localhost:8080
```

The Todo application used for Playwright automation is available at:

```text
http://localhost:8080/todo
```

---

# Running Playwright Tests

The Playwright configuration automatically starts the application before the tests are executed.

Run all Playwright tests:

```bash
npx playwright test
```

There is no need to manually run `npm start` before running the tests.

The application is automatically started using the `webServer` configuration in `playwright.config.ts`:

```ts
webServer: {
    command: 'npm start',
    url: 'http://127.0.0.1:8080',
    reuseExistingServer: false,
    timeout: 60_000,
},
```

The test execution flow is:

```text
npx playwright test
        ↓
Playwright starts the application
        ↓
Waits for http://127.0.0.1:8080
        ↓
Runs the Playwright tests
        ↓
Stops the application after the test run
```

## Run Tests in Headed Mode

To see the browser while the tests are running:

```bash
npx playwright test --headed
```

## Run Tests Using the Playwright UI

```bash
npx playwright test --ui
```

## Run a Specific Test File

For example:

```bash
npx playwright test tests/task-creation.spec.ts
```

## Run Tests with a Specific Browser

For example, to run the Chromium project:

```bash
npx playwright test --project=chromium
```

## View the Playwright HTML Report

After running the tests:

```bash
npx playwright show-report
```

---

# Allure Reports

The project also supports Allure reporting.

After running the Playwright tests, generate the Allure report:

```bash
allure generate allure-results --clean -o allure-report
```

Open the report:

```bash
allure open allure-report
```

If Allure is not installed globally, use:

```bash
npx allure-commandline generate allure-results --clean -o allure-report
```

Then open it:

```bash
npx allure-commandline open allure-report
```

---

# Docker

Docker support is included for running the application inside a Docker container.

Make sure Docker Desktop is installed and running before using the commands below.

## Build the Docker Image

From the project root, where the `Dockerfile` is located, run:

```bash
docker build -t todo-app .
```

The `.` at the end tells Docker to use the current directory as the build context.

Verify that the image was created:

```bash
docker images
```

You should see the `todo-app` image.

## Run the Docker Container

Run the application:

```bash
docker run --name todo-app-container -p 8080:8080 todo-app
```

The application will be available at:

```text
http://localhost:8080
```

The Todo application will be available at:

```text
http://localhost:8080/todo
```

To stop the container, press:

```text
Ctrl + C
```

## Run Docker in the Background

To run the container in detached mode:

```bash
docker run -d --name todo-app-container -p 8080:8080 todo-app
```

Check running containers:

```bash
docker ps
```

View the container logs:

```bash
docker logs todo-app-container
```

Stop the container:

```bash
docker stop todo-app-container
```

Remove the container:

```bash
docker rm todo-app-container
```

---

# Docker Compose

The application can also be built and started using Docker Compose.

From the project root:

```bash
docker compose up --build
```

The Todo application will then be available at:

```text
http://localhost:8080/todo
```

To stop Docker Compose:

```bash
docker compose down
```

To run Docker Compose in the background:

```bash
docker compose up --build -d
```

Check the running containers:

```bash
docker compose ps
```

View the application logs:

```bash
docker compose logs
```

---

# Running Playwright Tests Against Docker

Playwright does **not** automatically start Docker.

Playwright's `webServer` configuration automatically starts the application using:

```bash
npm start
```

Docker is a separate option for running the application.

To run Playwright tests against the Dockerized application:

## 1. Start the Docker Container

```bash
docker run -d --name todo-app-container -p 8080:8080 todo-app
```

Or use Docker Compose:

```bash
docker compose up --build -d
```

## 2. Run the Playwright Tests

Because the application is already running in Docker, Playwright must use the existing server.

If needed, update the Playwright configuration to allow reusing the existing server:

```ts
reuseExistingServer: true,
```

Then run:

```bash
npx playwright test
```

## 3. Stop Docker

If using a Docker container:

```bash
docker stop todo-app-container
docker rm todo-app-container
```

If using Docker Compose:

```bash
docker compose down
```

---

# Original Cypress Implementation

The original Cypress implementation is still present in this repository.

## Run Original Cypress Tests

Run the original Cypress tests locally:

```bash
npm run local:run
```

Open Cypress interactively:

```bash
npm run local:open
```

Other available Cypress commands include:

```bash
npm run e2e
```

Run Cypress using Chrome:

```bash
npm run e2e:chrome
```

Run Cypress using Edge:

```bash
npm run e2e:edge
```

Run Cypress using Firefox:

```bash
npm run e2e:firefox
```

Run Cypress directly:

```bash
npm run cy:run
```

Open Cypress:

```bash
npm run cy:open
```

---

# Quick Start

## Playwright

Install dependencies:

```bash
npm ci
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

The application starts automatically through the Playwright `webServer` configuration.

## Docker

Build the image:

```bash
docker build -t todo-app .
```

Run the container:

```bash
docker run --name todo-app-container -p 8080:8080 todo-app
```

Or use Docker Compose:

```bash
docker compose up --build
```

Open the Todo application:

```text
http://localhost:8080/todo
```

## Cypress

Run the original Cypress tests:

```bash
npm run local:run
```

---

## CI Status

The following table lists live workflows from various CI providers. These independently test the original contents of this example repository.

| CI Provider | Workflow | Build Status | Docker example |
| :--- | :--- | :--- | :---: |
| [CircleCI][CircleCI docs] | [.circleci/config.yml][CircleCI workflow] | [![CircleCI][CircleCI badge]][CircleCI log] | :white_check_mark: |
| [cypress-io/github-action][Cy GitHub Actions docs] | [using-action.yml][Cy GitHub Actions workflow] | [![Cypress GHA status][Cy GitHub Actions badge]][Cy GitHub Actions log] | |
| [GitHub Actions][GHA docs] | [single.yml][GHA workflow single] | [![Single tests status][GHA badge single]][GHA log single] | |
| [GitHub Actions][GHA docs] | [parallel.yml][GHA workflow parallel] | [![Parallel tests status][GHA badge parallel]][GHA log parallel] | |

<!-- CI provider links -->
[CircleCI docs]: https://circleci.com/docs/
[CircleCI badge]: https://circleci.com/gh/cypress-io/cypress-example-kitchensink/tree/master.svg?style=shield
[CircleCI log]: https://circleci.com/gh/cypress-io/cypress-example-kitchensink/tree/master
[CircleCI workflow]: .circleci/config.yml

[Cy GitHub Actions docs]: https://github.com/cypress-io/github-action#readme
[Cy GitHub Actions badge]: https://github.com/cypress-io/cypress-example-kitchensink/actions/workflows/using-action.yml/badge.svg
[Cy GitHub Actions log]: https://github.com/cypress-io/cypress-example-kitchensink/actions/workflows/using-action.yml?query=branch%3Amaster
[Cy GitHub Actions workflow]: .github/workflows/using-action.yml

[GHA docs]: https://docs.github.com/en/actions
[GHA badge single]: https://github.com/cypress-io/cypress-example-kitchensink/actions/workflows/single.yml/badge.svg
[GHA badge parallel]: https://github.com/cypress-io/cypress-example-kitchensink/actions/workflows/parallel.yml/badge.svg
[GHA log single]: https://github.com/cypress-io/cypress-example-kitchensink/actions/workflows/single.yml?query=branch%3Amaster
[GHA log parallel]: https://github.com/cypress-io/cypress-example-kitchensink/actions/workflows/parallel.yml?query=branch%3Amaster
[GHA workflow single]: .github/workflows/single.yml
[GHA workflow parallel]: .github/workflows/parallel.yml

## CI Workflow Examples

This repository contains examples of CI workflows for several CI providers.

| CI Provider | Basic Config | Full Parallel Config | Docker example |
| :--- | :--- | :--- | :---: |
| [AWS Amplify][AWS Amplify docs] | [amplify.yml](amplify.yml) | | |
| [AWS CodeBuild][AWS CodeBuild docs] | [basic/buildspec.yml](./basic/buildspec.yml) | [buildspec.yml](buildspec.yml) | |
| [Azure Pipelines][Azure Pipelines docs] | [basic/azure-ci.yml](basic/azure-ci.yml) | [azure-ci.yml](azure-ci.yml) | |
| [Buddy.works][Buddy.works docs] | [buddy.yml](buddy.yml) | | :white_check_mark: |
| [Buildkite][Buildkite docs] | [basic/.buildkite/pipeline.yml](basic/.buildkite/pipeline.yml) | | |
| [CircleCI][CircleCI docs] | [basic/.circleci/config.yml](basic/.circleci/config.yml) | | :white_check_mark: |
| [GitHub Actions][GHA docs] | [chrome.yml](.github/workflows/chrome.yml) | | |
| [GitHub Actions][GHA docs] | [chrome-docker.yml](.github/workflows/chrome-docker.yml) | | :white_check_mark: |
| [GitLab][GitLab docs] | [basic/.gitlab-ci.yml](basic/.gitlab-ci.yml) | [.gitlab-ci.yml](.gitlab-ci.yml) | :white_check_mark: |
| [Jenkins][Jenkins docs] | [basic/Jenkinsfile](basic/Jenkinsfile) | [Jenkinsfile](Jenkinsfile) | :white_check_mark: |
| [Semaphore 2.0][Semaphore 2.0 docs] | [basic/.semaphore.yml](basic/.semaphore.yml) | [.semaphore/semaphore.yml](.semaphore.yml) | |
| [Travis CI][Travis CI docs] | [basic/.travis.yml](basic/.travis.yml) | [.travis.yml](.travis.yml) | |

[AWS Amplify docs]: https://docs.amplify.aws/
[AWS CodeBuild docs]: https://docs.aws.amazon.com/codebuild/
[Azure Pipelines docs]: https://learn.microsoft.com/en-us/azure/devops/pipelines/
[Buddy.works docs]: https://buddy.works/docs
[Buildkite docs]: https://buildkite.com/docs
[GitLab docs]: https://docs.gitlab.com/ee/ci/yaml/
[Jenkins docs]: https://www.jenkins.io/doc/
[Semaphore 2.0 docs]: https://docs.semaphoreci.com/
[Travis CI docs]: https://docs.travis-ci.com/

## CI Testing

If you would like to run the original CI examples, fork the repository and configure the relevant CI provider.

## Documentation

- Use the [Cypress Documentation](https://on.cypress.io) for instructions on how to use Cypress.
- Read the [Cypress Command Line Guide](https://on.cypress.io/command-line) for run options.
- Refer to the [Cypress API](https://on.cypress.io/api/) documents to understand the Cypress API calls tested in the repository.
- Read [Installing Cypress](https://on.cypress.io/installing-cypress) for step-by-step information on installing Cypress.
- Use the [Playwright Documentation](https://playwright.dev/docs/intro) for information about Playwright and its APIs.

## Support

- For Cypress questions and discussions, visit the Cypress [Discord Chat](https://on.cypress.io/discord).

## Contributing

Check out the [Contributing Guideline](./CONTRIBUTING.md).

## Changelog

See [Releases](https://github.com/cypress-io/cypress-example-kitchensink/releases).