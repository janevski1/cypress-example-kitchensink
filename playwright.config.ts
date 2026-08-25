import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    retries:  2,
    workers: 1,
    reporter: 'html',

    use: {
        baseURL: 'http://localhost:8080',
        headless: false,
        launchOptions: {
            slowMo: 1000,
        },
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
