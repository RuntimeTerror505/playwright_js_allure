// @ts-check
const { devices } = require('@playwright/test');
/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  retries: 1,
  // workers: 1,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {

    timeout: 5000
  },

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  projects : [
    {
      name: 'firefox',
      use: {
        browserName : 'firefox',
      }
    },
    {
      name: 'chrome',
      use: {
        browserName : 'chromium',
        // viewport: {width: 720, height: 720},
        headless: false,
        // ...devices['Galaxy Note 3'],
        video: "retain-on-failure",
        trace: "retain-on-failure",
        permissions:['geolocation'],
      }
    }
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
       screenshot: 'only-on-failure',
        trace: 'on'
  },
};

module.exports = config;
