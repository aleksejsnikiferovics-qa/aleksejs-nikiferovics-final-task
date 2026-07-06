# Playwright final task for 2026 Int course 

This project uses **Playwright** for end-to-end testing and **Allure** for test reporting.

## Prerequisites

Before running the tests, make sure you have the following installed:

- Node.js (latest LTS version recommended)
- npm
- Git

Verify your installation:

```bash
node -v
npm -v
```

---

## Installation

Clone the repository and install the project dependencies:

```bash
git clone <repository-url>
cd <repository-folder>
npm ci
```

---

## Install Playwright Browsers

### macOS / Windows

```bash
npx playwright install chromium
```

### Linux

```bash
npx playwright install --with-deps chromium
```

---

## Configure Environment Variables

The test suite requires the `BASE_URL` environment variable.

### macOS / Linux

```bash
export BASE_URL=https://automationexercise.com
```

### Windows PowerShell

```powershell
$env:BASE_URL="https://automationexercise.com"
```

---

## Running the Tests

Run the Playwright test suite:

```bash
npx playwright test --project=automation-exercise
```

Or, on macOS/Linux, run everything in a single command:

```bash
BASE_URL=https://automationexercise.com npx playwright test --project=automation-exercise
```

---

## Test Reports

After the test run, generate an Allure report:

```bash
npx allure generate allure-results --clean -o allure-report
```

Open the report:

```bash
npx allure open allure-report
```

If Allure is not installed, install it once as a development dependency:

```bash
npm install --save-dev allure-commandline
```

or globally:

```bash
npm install -g allure-commandline
```

---

## Project Workflow

### One-time setup

```bash
npm ci
npx playwright install chromium
```

### Run the test suite

```bash
export BASE_URL=https://automationexercise.com
npx playwright test --project=automation-exercise
```

### Generate the Allure report

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

### Open Allure report locally

```Terminal
cd Downloads
cd allure-report
npx serve .
---

## GitHub Actions

The GitHub Actions workflow automatically:

- Installs project dependencies
- Caches Playwright browsers
- Installs Chromium
- Executes the Playwright test suite
- Uploads the Playwright HTML report
- Uploads test results
- Generates and uploads the Allure HTML report
