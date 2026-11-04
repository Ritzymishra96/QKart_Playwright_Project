
const { defineConfig, devices } = require('@playwright/test');
const dataset = require('./utils/TestData.json');

module.exports = defineConfig({
  testDir: './tests',
  outputDir: './test-results',

  timeout: 30_000,

  expect: {
    timeout: 5_000
  },

  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,

  retries: process.env.CI ? 2 : 1,
  forbidOnly: Boolean(process.env.CI),

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  use: {
    baseURL: process.env.BASE_URL || dataset.URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
