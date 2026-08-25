import { test as base, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

type TodoFixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<TodoFixtures>({
  todoPage: async ({ page }, use) => {
    // Open application
    await page.goto('/todo');

    // Clear saved state before every test
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    // Reload with clean state
    await page.reload();

    // Create Page Object
    const todoPage = new TodoPage(page);

    // Make fixture available to the test
    await use(todoPage);
  },
});

export { expect };