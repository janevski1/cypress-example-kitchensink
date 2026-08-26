import { test, expect } from './fixtures/todo.fixture';

test.describe('Todo - Toggle All Tasks', () => {
    test('Complete all tasks', async ({ todoPage }) => {
        const tasks = ['Task A', 'Task B', 'Task C'];

        for (const task of tasks) {
            await todoPage.createTask(task);
        }

        await todoPage.completeAllTasks();

        for (const task of tasks) {
            await expect(todoPage.getTaskCheckbox(task)).toBeChecked();
        }
    });

    test('Uncomplete all completed tasks', async ({ todoPage }) => {
        const tasks = ['Task A', 'Task B', 'Task C'];

        for (const task of tasks) {
            await todoPage.createTask(task);
        }

        await todoPage.completeAllTasks();

        for (const task of tasks) {
            await expect(todoPage.getTaskCheckbox(task)).toBeChecked();
        }

        await todoPage.uncompleteAllTasks();

        for (const task of tasks) {
            await expect(todoPage.getTaskCheckbox(task)).not.toBeChecked();
        }
    });

    test('Complete all tasks when some tasks are already completed', async ({
        todoPage,
    }) => {
        const taskA = 'Task A';
        const taskB = 'Task B';
        const taskC = 'Task C';

        await todoPage.createTask(taskA);
        await todoPage.createTask(taskB);
        await todoPage.createTask(taskC);

        await todoPage.completeTask(taskA);

        await todoPage.completeAllTasks();

        await expect(todoPage.getTaskCheckbox(taskA)).toBeChecked();
        await expect(todoPage.getTaskCheckbox(taskB)).toBeChecked();
        await expect(todoPage.getTaskCheckbox(taskC)).toBeChecked();
    });
});