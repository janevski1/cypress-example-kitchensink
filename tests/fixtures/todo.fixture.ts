import { test as base, expect } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

type TodoFixtures = {
  todoPage: TodoPage;
};

export const test = base.extend<TodoFixtures>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);

    // Open application
    await todoPage.goto();

    // Delete default task only if it exists
    if (await todoPage.getTaskItem('Pay electric bill').count() > 0) {
      await todoPage.deleteTask('Pay electric bill');
    }

    // Delete default task only if it exists
    if (await todoPage.getTaskItem('Walk the dog').count() > 0) {
      await todoPage.deleteTask('Walk the dog');
    }

    // Verify that both default tasks are removed
    await expect(
      todoPage.getTaskItem('Pay electric bill'),
    ).toHaveCount(0);

    await expect(
      todoPage.getTaskItem('Walk the dog'),
    ).toHaveCount(0);

    // Verify the test starts with an empty task list
    await expect(todoPage.getAllTasks()).toHaveCount(0);

    await use(todoPage);
  },
});

export { expect };