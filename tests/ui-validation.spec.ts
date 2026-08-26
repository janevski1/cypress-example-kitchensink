import { test, expect } from './fixtures/todo.fixture';

test.describe('Todo - UI Validation', () => {
    test('should display the task input field', async ({ todoPage }) => {
        await expect(todoPage.newTaskInput).toBeVisible();
    });

    test('Display all task filters', async ({ todoPage }) => {
        await todoPage.createTask('Task A');
        await expect(todoPage.allFilter).toBeVisible();
        await expect(todoPage.activeFilter).toBeVisible();
        await expect(todoPage.completedFilter).toBeVisible();
    });

    test('Display a created task with its controls', async ({
        todoPage,
    }) => {
        const taskName = 'Task A';

        await todoPage.createTask(taskName);

        await expect(todoPage.getTaskLabel(taskName)).toBeVisible();
        await expect(todoPage.getTaskCheckbox(taskName)).toBeVisible();
        await todoPage.getTaskItem(taskName).hover();
        await expect(todoPage.getTaskDeleteButton(taskName)).toBeVisible();
    });

    test('Display the clear completed button when a task is completed', async ({
        todoPage,
    }) => {
        const taskName = 'Task A';

        await todoPage.createTask(taskName);
        await todoPage.completeTask(taskName);

        await expect(todoPage.clearCompletedButton).toBeVisible();
    });
});