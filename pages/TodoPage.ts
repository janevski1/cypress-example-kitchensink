import { expect, Locator, Page } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    readonly newTaskInput: Locator;
    readonly todoList: Locator;
    readonly allFilter: Locator;
    readonly activeFilter: Locator;
    readonly completedFilter: Locator;
    readonly clearCompletedButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newTaskInput = page.locator('.new-todo');
        this.todoList = page.locator('.todo-list')
        this.allFilter = page.getByText('All');
        this.activeFilter = page.getByText('Active');
        this.completedFilter = page.getByText('Completed');
        this.clearCompletedButton = page.getByText('Clear completed')
    }

    async goto(): Promise<void> {
        await this.page.goto('/todo');
    }

    getTaskItem(taskName: string): Locator {
        return this.page.locator('li').filter({
            hasText: taskName,
        });
    }

    getTaskLabel(taskName: string): Locator {
        return this.getTaskItem(taskName).locator('.view label');
    }

    getTaskCheckbox(taskName: string): Locator {
        return this.getTaskItem(taskName).locator(
            '.view input[type="checkbox"]',
        );
    }

    getTaskDeleteButton(taskName: string): Locator {
        return this.getTaskItem(taskName).locator('.view button');
    }

    async createTask(taskName: string): Promise<void> {
        await this.newTaskInput.fill(taskName);
        await this.newTaskInput.press('Enter');
    }

    async completeTask(taskName: string): Promise<void> {
        await this.getTaskCheckbox(taskName).check();
    }

    async uncompleteTask(taskName: string): Promise<void> {
        await this.getTaskCheckbox(taskName).uncheck();
    }

    async deleteTask(taskName: string): Promise<void> {
        await this.getTaskDeleteButton(taskName).click();
    }

    async filterBy(filter: 'All' | 'Active' | 'Completed'): Promise<void> {
        const filters = {
            All: this.allFilter,
            Active: this.activeFilter,
            Completed: this.completedFilter,
        };

        await filters[filter].click();
    }

    async clearCompleted(): Promise<void> {
        await this.clearCompletedButton.click();
    }

    getAllTasks(): Locator {
        return this.page.locator('li[data-id]');
    }
}