# QKart E-Commerce – Playwright Automation Framework

This repository contains an end-to-end test automation framework developed for the QKart E-Commerce application using Playwright with JavaScript. The framework follows a Hybrid Automation Framework approach, combining Page Object Model (POM), reusable utilities, custom fixtures, and structured test data management to ensure scalability, maintainability, and efficient test execution.

### Key Features

- **Hybrid Framework:** Developed a hybrid automation framework integrating POM, reusable components, utilities, and organized test scripts.
- **Page Object Model (POM):** Implemented POM to separate page locators and actions from test scripts, improving code reusability and maintainability.
- **Custom Fixtures:** Created reusable fixtures to manage browser instances, page objects, test setup, and teardown activities.
- **Utility Classes:** Developed reusable utility methods to handle common operations and reduce code duplication.
- **Test Data Management:** Implemented structured test data management to support flexible and data-driven test execution.
- **Test Reporting:** Integrated Playwright HTML reports to provide detailed execution results, test status, and failure information.
- **Retry Mechanism:** Configured automatic retries to handle intermittent failures and improve execution reliability.
- **Parallel Execution:** Implemented parallel test execution using Playwright workers to reduce execution time and improve efficiency.
- **Cross-Browser Testing:** Utilized Playwright's browser support for testing across Chromium, Firefox, and WebKit.
- **Reusable Components:** Designed modular components to simplify framework maintenance and future enhancements.

### Technology Stack

- Automation Tool: Playwright
- Programming Language: JavaScript
- Framework: Hybrid Automation Framework
- Design Pattern: Page Object Model (POM)
- Test Runner: Playwright Test
- Test Management: Custom Fixtures and Utility Classes
- Reporting: Playwright HTML Reports
- Execution: Parallel Execution and Retry Mechanism
- Version Control: Git and GitHub

### Project Objective

The objective of this project is to demonstrate practical expertise in building a scalable Playwright automation framework for an e-commerce application. It covers end-to-end user workflows, framework architecture, reusable automation components, test data management, reporting, parallel execution, and automation best practices. The framework is designed to support reliable regression testing, simplify maintenance, and improve overall test execution efficiency.


QKart E-Commerce
Playwright + JavaScript Automation Test Strategy & Learning Report
Page Object Model • API + UI Testing • End-to-End Scenarios • Edge Cases
Application under test https://crio-qkart-frontend-qa.vercel.app/ Prepared for a beginner-friendly, hands-on automation project
1. Executive summary
This report proposes a maintainable Playwright automation framework for the Crio QKart QA e-commerce application. The recommended approach combines browser-based end-to-end tests with API setup and API-level assertions. The objective is to learn the complete automation workflow without overengineering the first version.
Primary stack: Playwright Test, JavaScript, Node.js, APIRequestContext, and Page Object Model (POM).
Main business flow: register/login, product discovery, cart management, address selection, checkout, and order confirmation.
Test design: 10 core test cases plus negative, boundary, state, and reliability edge cases.
Important limitation: the live site is a client-rendered app. Its HTML shell alone does not reveal all routes or API calls. Actual selectors, API base URL, payloads, and response contracts must be discovered in browser DevTools before coding.
2. Application understanding and scope
QKart is described in Crio project material as an e-commerce application. The documented feature set includes user registration and login, product listing and search, cart operations, checkout, and address handling. The frontend uses REST APIs to load data and perform authenticated cart operations.


3. Test strategy
Use API calls for fast, repeatable test data setup where supported; use UI for the user journey and visible outcomes.
Keep at least one full UI-only journey so the application is tested as a real customer would use it.
Do not use API calls to bypass the behavior that a test is supposed to validate. For example, test registration through the UI in the registration test.
Validate important business outcomes at two levels: UI confirmation and backend/API state when an observable endpoint exists.
Use a unique user per test that creates an account. Avoid hard-coded shared accounts for parallel tests.
Treat the QA environment as shared and potentially unstable. Avoid destructive tests against other users' data.
4. Ten recommended test cases


5. Edge cases and negative scenarios


6. API testing: how to discover the real contract
Do not hard-code guessed API paths. Open the application in Chrome, press F12, select Network, filter by Fetch/XHR, and perform one action at a time. Record the request URL, HTTP method, request body, status code, response JSON, headers, and whether an Authorization token is sent.
Clear the Network log, then register a new test user. Capture the registration request and response.
Log in with that user. Identify the authentication endpoint and where the token is returned/stored.
Load the product page. Identify the product-list request and its response shape.
Add a product to cart, change quantity, and remove it. Capture each request and compare cart state.
Add/select an address and complete checkout. Capture the address and order/checkout requests.
Record the actual API base URL separately from the frontend URL. The backend may be hosted on another domain.
Crio's public QKart backend learning material documents user, authentication, cart, and checkout APIs, including a GET /v1/users capability and authenticated cart operations. Those materials are useful for understanding the likely API architecture, but they are not proof that this particular deployed QA frontend currently uses identical routes or payloads. Verify all details in DevTools.
7. Recommended project structure
qkart-playwright/ ├── tests/ │   ├── auth.spec.js │   ├── catalog.spec.js │   ├── cart.spec.js │   ├── checkout.spec.js │   └── api/ │       ├── auth.api.spec.js │       └── cart.api.spec.js ├── pages/ │   ├── BasePage.js │   ├── HomePage.js │   ├── RegisterPage.js │   ├── LoginPage.js │   ├── ProductsPage.js │   ├── CartPage.js │   └── CheckoutPage.js ├── api/ │   ├── AuthApi.js │   ├── ProductsApi.js │   └── CartApi.js ├── fixtures/ │   └── test-fixtures.js ├── utils/ │   ├── testData.js │   └── assertions.js ├── playwright.config.js ├── package.json └── .env.example
8. POM design: what belongs where?


9. Beginner-friendly starter code
Install and initialise
mkdir qkart-playwright cd qkart-playwright npm init -y npm install -D @playwright/test npx playwright install
Add scripts to package.json:
{   "scripts": {     "test": "npx playwright test",     "test:headed": "npx playwright test --headed",     "test:report": "npx playwright show-report"   } }
playwright.config.js
const { defineConfig, devices } = require('@playwright/test');  module.exports = defineConfig({   testDir: './tests',   timeout: 30_000,   expect: { timeout: 5_000 },   fullyParallel: true,   retries: process.env.CI ? 2 : 0,   reporter: [['list'], ['html', { open: 'never' }]],   use: {     baseURL: 'https://crio-qkart-frontend-qa.vercel.app',     trace: 'retain-on-failure',     screenshot: 'only-on-failure',     video: 'retain-on-failure'   },   projects: [     { name: 'chromium', use: { ...devices['Desktop Chrome'] } }   ] });
Example Page Object (LoginPage.js)
class LoginPage {   constructor(page) {     this.page = page;     // Replace these example locators after inspecting the live DOM.     this.username = page.getByLabel(/username/i);     this.password = page.getByLabel(/password/i);     this.loginButton = page.getByRole('button', { name: /login/i });   }    async goto() {     await this.page.goto('/login');   }    async login(username, password) {     await this.username.fill(username);     await this.password.fill(password);     await this.loginButton.click();   } }  module.exports = { LoginPage };
Example UI test (auth.spec.js)
const { test, expect } = require('@playwright/test'); const { LoginPage } = require('../pages/LoginPage');  test('valid user can log in', async ({ page }) => {   const loginPage = new LoginPage(page);   await loginPage.goto();   await loginPage.login(     process.env.TEST_USERNAME,     process.env.TEST_PASSWORD   );    // Replace with a stable, user-visible assertion from the real app.   await expect(page).toHaveURL(/products|\/$/); });
The locators and route above are teaching examples, not verified selectors. Inspect the actual form labels, roles, accessible names, and routes before copying this test into the suite. Prefer getByRole/getByLabel/getByPlaceholder over brittle CSS or long XPath selectors.
Example API test pattern
const { test, expect } = require('@playwright/test');  test('API login returns an authentication response', async ({ request }) => {   const response = await request.post(process.env.API_BASE_URL + '/REPLACE_AFTER_DISCOVERY', {     data: {       username: process.env.TEST_USERNAME,       password: process.env.TEST_PASSWORD     }   });    expect(response.ok()).toBeTruthy();   const body = await response.json();    // Assert the actual response contract discovered in DevTools.   expect(body).toBeTruthy(); });
Keep credentials in environment variables or CI secrets. Do not commit .env, tokens, or real customer data. For API tests, validate status, response schema/required fields, and meaningful business values—not just response.ok().
10. Hybrid API + UI flow recommendation


11. What else should you add beyond POM?
Playwright fixtures: provide reusable page objects, authenticated contexts, and API clients.
API client/service layer: keep request construction out of page objects and test specs.
Environment configuration: separate QA/staging URLs and credentials; use .env locally and secrets in CI.
Schema validation: validate important API response shapes once the real contract is known.
Authentication state: use storageState only after learning how the app stores authentication; create separate state per test user.
Test tagging: @smoke, @regression, @api, @e2e so you can run targeted suites.
Reporting and diagnostics: HTML report, trace, screenshot, and video on failure.
CI/CD: run smoke tests on pull requests and broader regression on a schedule or deployment.
Accessibility and responsive checks: verify keyboard access and a small/mobile viewport after core functional coverage.
Data isolation: unique accounts, deterministic product selection, and safe cleanup.
12. Beginner learning roadmap


13. Common beginner mistakes to avoid
Do not use page.waitForTimeout() as the default wait. Prefer locator auto-waiting, expect(locator), and waitForResponse for known network events.
Do not mix implicit waits with Playwright; Playwright has its own auto-waiting model.
Do not put every test in one huge spec or every locator in one giant page class.
Do not share one mutable user/cart across parallel tests.
Do not assert implementation details such as React class names when a user-facing role or label is available.
Do not assume the checkout endpoint, token key, product IDs, or payload shape—capture them first.
Do not use fixed product indexes unless the catalog order is guaranteed. Select by product name or a stable test identifier.
14. Acceptance criteria for the project
All 10 core test cases are documented with preconditions, steps, and expected results.
At least one full customer journey runs from a clean test account through successful checkout.
At least 5 meaningful edge cases are automated, including invalid login, no-result search, cart minimum, missing address, and duplicate-submit protection where applicable.
At least 3 API tests validate real discovered endpoints and response contracts.
Page objects contain page behavior; test specs contain scenario orchestration and assertions.
Test data is unique and parallel execution does not cause account/cart collisions.
Failure output includes a trace and screenshot, with an HTML report.
15. Sources and verification notes
Application URL: https://crio-qkart-frontend-qa.vercel.app/
Crio QKart frontend project overview: https://www.crio.do/learn/portfolio/coolsuraj96/ME_QKART_FRONTEND_V2/
Crio QKart backend project overview: https://www.crio.do/learn/portfolio/kk5190krrish/ME_QKART_BACKEND/
Example automation project for this application: https://github.com/JafarSherif27/QKart_Assignment
Verification note: The deployed frontend returned a JavaScript-required shell during text-based inspection. Therefore this report is a test strategy and learning blueprint, not a claim that the live UI was fully interactively inspected or that any test case/API call has been executed. Before implementation, manually inspect the current application and record selectors, routes, API host, request bodies, response schemas, and actual expected messages. Public Crio portfolio descriptions are architectural context, not a substitute for observing the deployed QA environment.
Final recommendation
Start small: build TC02 (login), TC04 (search), TC06 (add to cart), and TC08 (checkout) first. Create a clean POM for those flows, then introduce API calls to prepare users and verify cart/order state. Once this foundation is stable, add the remaining cases and edge scenarios. This sequence gives a beginner visible progress while teaching the same architecture used in professional automation projects.
