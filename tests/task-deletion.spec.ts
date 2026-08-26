import { test, expect } from './fixtures/todo.fixture';

test.describe('Todo - Task Deletion', () => {
    test('Delete an active task', async ({ todoPage }) => {
        const taskName = 'Task A';

        await todoPage.createTask(taskName);

        await expect(todoPage.getTaskItem(taskName)).toBeVisible();

        await todoPage.deleteTask(taskName);

        await expect(todoPage.getTaskItem(taskName)).toHaveCount(0);
    });

    test('Delete a completed task', async ({ todoPage }) => {
        const taskName = 'Task A';

        await todoPage.createTask(taskName);
        await todoPage.completeTask(taskName);

        await todoPage.deleteTask(taskName);

        await expect(todoPage.getTaskItem(taskName)).toHaveCount(0);
    });

    test('Delete only the selected task', async ({ todoPage }) => {
        const taskA = 'Task A';
        const taskB = 'Task B';
        const taskC = 'Task C';

        await todoPage.createTask(taskA);
        await todoPage.createTask(taskB);
        await todoPage.createTask(taskC);

        await todoPage.deleteTask(taskB);

        await expect(todoPage.getTaskItem(taskB)).toHaveCount(0);

        await expect(todoPage.getTaskLabel(taskA)).toBeVisible();
        await expect(todoPage.getTaskLabel(taskC)).toBeVisible();

        await expect(todoPage.getAllTasks()).toHaveCount(2);
    });

    test('Display no tasks after deleting all tasks', async ({
        todoPage,
    }) => {
        const tasks = ['Task A', 'Task B', 'Task C'];

        for (const task of tasks) {
            await todoPage.createTask(task);
        }

        for (const task of tasks) {
            await todoPage.deleteTask(task);
        }

        await expect(todoPage.getAllTasks()).toHaveCount(0);
    });
});