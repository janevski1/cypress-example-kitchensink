import { test, expect } from './fixtures/todo.fixture';

test.describe('Todo - Task Filters', () => {
    test('Display only active tasks', async ({ todoPage }) => {
        const activeTask = 'Task A';
        const completedTask = 'Task B';

        await todoPage.createTask(activeTask);
        await todoPage.createTask(completedTask);

        await todoPage.completeTask(completedTask);

        await todoPage.filterBy('Active');

        await expect(todoPage.getTaskLabel(activeTask)).toBeVisible();
        await expect(todoPage.getTaskItem(completedTask)).not.toBeVisible();
    });

    test('Display only completed tasks', async ({ todoPage }) => {
        const activeTask = 'Task A';
        const completedTask = 'Task B';

        await todoPage.createTask(activeTask);
        await todoPage.createTask(completedTask);

        await todoPage.completeTask(completedTask);

        await todoPage.filterBy('Completed');

        await expect(todoPage.getTaskLabel(completedTask)).toBeVisible();
        await expect(todoPage.getTaskItem(activeTask)).not.toBeVisible();
    });

    test('Display all active and completed tasks', async ({
        todoPage,
    }) => {
        const activeTask = 'Task A';
        const completedTask = 'Task B';

        await todoPage.createTask(activeTask);
        await todoPage.createTask(completedTask);

        await todoPage.completeTask(completedTask);

        await todoPage.filterBy('All');

        await expect(todoPage.getTaskLabel(activeTask)).toBeVisible();
        await expect(todoPage.getTaskLabel(completedTask)).toBeVisible();
    });

    test('Display no tasks in Active filter when all tasks are completed', async ({
        todoPage,
    }) => {
        await todoPage.createTask('Task A');
        await todoPage.createTask('Task B');

        await todoPage.completeTask('Task A');
        await todoPage.completeTask('Task B');

        await todoPage.filterBy('Active');

        await expect(todoPage.getTaskItem('Task A')).not.toBeVisible();
        await expect(todoPage.getTaskItem('Task B')).not.toBeVisible();
    });

    test('Display no tasks in Completed filter when all tasks are active', async ({
        todoPage,
    }) => {
        await todoPage.createTask('Task A');
        await todoPage.createTask('Task B');

        await todoPage.filterBy('Completed');

        await expect(todoPage.getTaskItem('Task A')).not.toBeVisible();
        await expect(todoPage.getTaskItem('Task B')).not.toBeVisible();
    });

    test('Display all tasks when all tasks are active and Active filter is selected', async ({
        todoPage,
    }) => {
        await todoPage.createTask('Task A');
        await todoPage.createTask('Task B');

        await todoPage.filterBy('Active');

        await expect(todoPage.getTaskLabel('Task A')).toBeVisible();
        await expect(todoPage.getTaskLabel('Task B')).toBeVisible();
    });

    test('Display all tasks when all tasks are completed and Completed filter is selected', async ({
        todoPage,
    }) => {
        await todoPage.createTask('Task A');
        await todoPage.createTask('Task B');

        await todoPage.completeTask('Task A');
        await todoPage.completeTask('Task B');

        await todoPage.filterBy('Completed');

        await expect(todoPage.getTaskLabel('Task A')).toBeVisible();
        await expect(todoPage.getTaskLabel('Task B')).toBeVisible();
    });

    test('Switch correctly between filters', async ({ todoPage }) => {
        const activeTask = 'Task A';
        const completedTask = 'Task B';

        await todoPage.createTask(activeTask);
        await todoPage.createTask(completedTask);
        await todoPage.completeTask(completedTask);

        await todoPage.filterBy('Active');

        await expect(todoPage.getTaskLabel(activeTask)).toBeVisible();
        await expect(todoPage.getTaskItem(completedTask)).not.toBeVisible();

        await todoPage.filterBy('Completed');

        await expect(todoPage.getTaskLabel(completedTask)).toBeVisible();
        await expect(todoPage.getTaskItem(activeTask)).not.toBeVisible();

        await todoPage.filterBy('All');

        await expect(todoPage.getTaskLabel(activeTask)).toBeVisible();
        await expect(todoPage.getTaskLabel(completedTask)).toBeVisible();
    });
});