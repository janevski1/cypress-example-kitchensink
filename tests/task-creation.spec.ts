import { test, expect } from './fixtures/todo.fixture';

test.describe('Todo - Task Creation', () => {
    const validTaskNames = [
        'Task A',
        'Buy groceries',
        'Task 123',
        'Task #1!',
        'Test automation - Playwright',
    ];

    for (const taskName of validTaskNames) {
        test(`should create task: ${taskName}`, async ({ todoPage }) => {
            await todoPage.createTask(taskName);

            await expect(todoPage.getTaskLabel(taskName)).toBeVisible();
        });
    }

    test('should create multiple tasks', async ({ todoPage }) => {
        const tasks = ['Task A', 'Task B', 'Task C'];

        for (const task of tasks) {
            await todoPage.createTask(task);
        }

        for (const task of tasks) {
            await expect(todoPage.getTaskLabel(task)).toBeVisible();
        }

        await expect(todoPage.getAllTasks()).toHaveCount(5);
    });

    test('should not create an empty task', async ({ todoPage }) => {
        await todoPage.createTask('');

        await expect(todoPage.getAllTasks()).toHaveCount(2);
    });

    test('should not create a whitespace-only task', async ({ todoPage }) => {
        await todoPage.createTask('   ');

        await expect(todoPage.getAllTasks()).toHaveCount(2);
    });

    test('should handle duplicate tasks according to application behavior', async ({
        todoPage,
    }) => {
        const taskName = 'Task A';

        await todoPage.createTask(taskName);
        await todoPage.createTask(taskName);

        await expect(todoPage.getTaskItem(taskName)).toHaveCount(2);
    });
});