import { test, expect } from './fixtures/todo.fixture';

test.describe('Todo - Clear Completed Tasks', () => {
    test('Clear completed tasks only', async ({ todoPage }) => {
        const activeTask = 'Task A';
        const completedTask = 'Task B';

        await todoPage.createTask(activeTask);
        await todoPage.createTask(completedTask);

        await todoPage.completeTask(completedTask);

        await todoPage.clearCompleted();

        await expect(todoPage.getTaskLabel(activeTask)).toBeVisible();
        await expect(todoPage.getTaskItem(completedTask)).toHaveCount(0);
    });

    test('Clear multiple completed tasks', async ({ todoPage }) => {
        const activeTask = 'Task A';
        const completedTask1 = 'Task B';
        const completedTask2 = 'Task C';

        await todoPage.createTask(activeTask);
        await todoPage.createTask(completedTask1);
        await todoPage.createTask(completedTask2);

        await todoPage.completeTask(completedTask1);
        await todoPage.completeTask(completedTask2);

        await todoPage.clearCompleted();

        await expect(todoPage.getTaskLabel(activeTask)).toBeVisible();
        await expect(todoPage.getTaskItem(completedTask1)).toHaveCount(0);
        await expect(todoPage.getTaskItem(completedTask2)).toHaveCount(0);

        await expect(todoPage.getAllTasks()).toHaveCount(1);
    });

    test('Should not remove active tasks when clearing completed tasks', async ({
        todoPage,
    }) => {
        await todoPage.createTask('Task A');
        await todoPage.createTask('Task B');

        await expect(todoPage.getTaskLabel('Task A')).toBeVisible();
        await expect(todoPage.getTaskLabel('Task B')).toBeVisible();
    });

    test('Clear completed tasks while Completed filter is selected', async ({
        todoPage,
    }) => {
        const activeTask = 'Task A';
        const completedTask = 'Task B';

        await todoPage.createTask(activeTask);
        await todoPage.createTask(completedTask);

        await todoPage.completeTask(completedTask);

        await todoPage.filterBy('Completed');

        await todoPage.clearCompleted();

        await expect(todoPage.getTaskItem(completedTask)).toHaveCount(0);

        await todoPage.filterBy('All');

        await expect(todoPage.getTaskLabel(activeTask)).toBeVisible();
    });
});