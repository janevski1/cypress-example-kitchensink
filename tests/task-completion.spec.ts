import { test, expect } from './fixtures/todo.fixture';

test.describe('Todo - Task Completion', () => {
    test('should create a task as active by default', async ({ todoPage }) => {
        const taskName = 'Task A';
        await todoPage.createTask(taskName);

        await expect(todoPage.getTaskCheckbox(taskName)).not.toBeChecked();
    });

    test('should complete a task', async ({ todoPage }) => {
        const taskName = 'Task A';
        await todoPage.createTask(taskName);
        await todoPage.completeTask(taskName);

        await expect(todoPage.getTaskCheckbox(taskName)).toBeChecked();
    });

    test('should uncomplete a task', async ({ todoPage }) => {
        const taskName = 'Task A';
        await todoPage.createTask(taskName);
        await todoPage.completeTask(taskName);

        await expect(todoPage.getTaskCheckbox(taskName)).toBeChecked();

        await todoPage.uncompleteTask(taskName);

        await expect(todoPage.getTaskCheckbox(taskName)).not.toBeChecked();
    });

    test('should complete and uncomplete the same task multiple times', async ({
        todoPage,
    }) => {
        const taskName = 'Task A';
        await todoPage.createTask(taskName);

        await todoPage.completeTask(taskName);
        await expect(todoPage.getTaskCheckbox(taskName)).toBeChecked();

        await todoPage.uncompleteTask(taskName);
        await expect(todoPage.getTaskCheckbox(taskName)).not.toBeChecked();

        await todoPage.completeTask(taskName);
        await expect(todoPage.getTaskCheckbox(taskName)).toBeChecked();
    });

    test('should complete only the selected task', async ({ todoPage }) => {
        const taskA = 'Task A';
        const taskB = 'Task B';
        const taskC = 'Task C';

        await todoPage.createTask(taskA);
        await todoPage.createTask(taskB);
        await todoPage.createTask(taskC);
        await todoPage.completeTask(taskB);

        await expect(todoPage.getTaskCheckbox(taskB)).toBeChecked();
        await expect(todoPage.getTaskCheckbox(taskA)).not.toBeChecked();
        await expect(todoPage.getTaskCheckbox(taskC)).not.toBeChecked();
    });
});