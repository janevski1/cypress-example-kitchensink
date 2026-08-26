import { Locator, Page } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    readonly newTaskInput: Locator;
    readonly todoList: Locator;
    readonly allFilter: Locator;
    readonly activeFilter: Locator;
    readonly completedFilter: Locator;
    readonly clearCompletedButton: Locator;
    readonly toggleAllButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Main page elements
        this.newTaskInput = page.locator('.new-todo');
        this.todoList = page.locator('.todo-list');

        // Task filters
        this.allFilter = page.getByRole('link', {
            name: 'All',
            exact: true,
        });

        this.activeFilter = page.getByRole('link', {
            name: 'Active',
            exact: true,
        });

        this.completedFilter = page.getByRole('link', {
            name: 'Completed',
            exact: true,
        });

        // Clear all completed tasks
        this.clearCompletedButton = page.getByText('Clear completed');

        // Complete/uncomplete all tasks
        this.toggleAllButton = page.locator('label[for="toggle-all"]');
    }

    // Open the Todo application
    async goto(): Promise<void> {
        await this.page.goto('/todo');
    }

    // Find a specific task by its name
    getTaskItem(taskName: string): Locator {
        return this.todoList.locator('li').filter({
            hasText: taskName,
        });
    }

    // Get the task text
    getTaskLabel(taskName: string): Locator {
        return this.getTaskItem(taskName).locator('.view label');
    }

    // Get the checkbox for a specific task
    getTaskCheckbox(taskName: string): Locator {
        return this.getTaskItem(taskName).locator(
            '.view input[type="checkbox"]',
        );
    }

    // Get the delete button for a specific task
    getTaskDeleteButton(taskName: string): Locator {
        return this.getTaskItem(taskName).locator('.view button');
    }

    // Create a new task
    async createTask(taskName: string): Promise<void> {
        await this.newTaskInput.fill(taskName);
        await this.newTaskInput.press('Enter');
    }

    // Mark a task as completed
    async completeTask(taskName: string): Promise<void> {
        await this.getTaskCheckbox(taskName).check();
    }

    // Mark a task as active again
    async uncompleteTask(taskName: string): Promise<void> {
        await this.getTaskCheckbox(taskName).uncheck();
    }

    // Hover over a task to show and click its delete button
    async deleteTask(taskName: string): Promise<void> {
        const task = this.getTaskItem(taskName);
        const deleteButton = this.getTaskDeleteButton(taskName);

        await task.hover();
        await deleteButton.click();
    }

    // Complete all tasks
    async completeAllTasks(): Promise<void> {
        await this.toggleAllButton.check();
    }

    // Uncomplete all tasks
    async uncompleteAllTasks(): Promise<void> {
        await this.toggleAllButton.uncheck();
    }

    // Filter tasks by status
    async filterBy(filter: 'All' | 'Active' | 'Completed'): Promise<void> {
        const filters = {
            All: this.allFilter,
            Active: this.activeFilter,
            Completed: this.completedFilter,
        };

        await filters[filter].click();
    }

    // Remove all completed tasks
    async clearCompleted(): Promise<void> {
        await this.clearCompletedButton.click();
    }

    // Get all tasks in the Todo list
    getAllTasks(): Locator {
        return this.todoList.locator('li[data-id]');
    }
}