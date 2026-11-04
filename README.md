# 🛒 QKart E-Commerce – Playwright Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-Automation-2EAD33?logo=playwright)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![Framework](https://img.shields.io/badge/Framework-Hybrid-blue)
![Testing](https://img.shields.io/badge/Testing-UI%20%7C%20API-orange)

## 📌 Project Overview

An end-to-end test automation framework for the **QKart E-Commerce application**, developed using **Playwright with JavaScript**. The framework follows a Hybrid Framework architecture, incorporating Page Object Model (POM), custom fixtures, reusable utilities, and data-driven testing practices.

## 🚀 Key Features

- **Hybrid Framework:** Modular and reusable automation architecture.
- **Page Object Model (POM):** Separation of page locators, actions, and test scripts.
- **Custom Fixtures:** Reusable browser, page, and test setup management.
- **Utility Classes:** Common reusable methods for efficient automation.
- **Test Data Management:** Structured and reusable test data.
- **API & UI Testing:** Coverage of end-to-end workflows and API scenarios.
- **HTML Reporting:** Detailed Playwright execution reports.
- **Retry Mechanism:** Automatic retries for failed test cases.
- **Parallel Execution:** Faster execution using Playwright workers.
- **Cross-Browser Testing:** Support for Chromium, Firefox, and WebKit.

## 🛠️ Technology Stack

| Category | Technology |
|---|---|
| Automation Tool | Playwright |
| Programming Language | JavaScript |
| Test Runner | Playwright Test |
| Framework | Hybrid Framework |
| Design Pattern | Page Object Model |
| API Testing | Playwright API |
| Reporting | Playwright HTML Report |
| Version Control | Git & GitHub |

## 📂 Project Structure

```text
QKart-Playwright/
├── tests/
├── pages/
├── fixtures/
├── utils/
├── test-data/
├── playwright.config.js
├── package.json
└── README.md
```

## ⚙️ Installation & Execution

**1. Clone the repository**

```bash
git clone https://github.com/Ritzymishra96/QKart_Playwright_Project.git
cd QKart_Playwright_Project
```

**2. Install dependencies**

```bash
npm install
```

**3. Install Playwright browsers**

```bash
npx playwright install
```

**4. Execute tests**

```bash
npx playwright test
```

Tests that sign in to the existing account require `QKART_USERNAME` and
`QKART_PASSWORD` environment variables. Without them, those tests are skipped;
registration and checkout tests continue to run with generated accounts.
Optionally set `QKART_TEST_PASSWORD` to choose the password for generated test
accounts, `QKART_INCORRECT_PASSWORD` for the invalid-login test, and `BASE_URL`
to override the application URL. Keep account credentials out of tracked files.

**5. Execute tests in headed mode**

```bash
npx playwright test --headed
```

**6. View HTML report**

```bash
npx playwright show-report
```

## 🎯 Project Objective

To demonstrate practical implementation of a scalable Playwright automation framework covering e-commerce workflows, reusable architecture, API and UI testing, parallel execution, reporting, and automation best practices.

---

**Author:** Ritesh Mishra
