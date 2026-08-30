import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    retries: 1,
    workers: 1,
    reporter: 'html',

    use: {
        baseURL: 'http://127.0.0.1:8080',
        // headless: false,
        // launchOptions: {
        //     slowMo: 1000,
        // },
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    webServer: {
        command: 'npm start',
        url: 'http://127.0.0.1:8080',
        reuseExistingServer: false,
        timeout: 60_000,
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
