Feature: Todo task management application

    As a user
    I want to manage my tasks
    So that I can keep track of my progress


    Scenario Outline: Create a new task with different task names
        Given the Todo application is open
        When I create a task with the name "<taskName>"
        Then the task "<taskName>" should be displayed in the task list

    Examples:
        | taskName |
        | Task A   |
        | Task B   |
        | Task C   |


    Scenario: Complete a task
        Given a task named "Task A" exists
        When I mark the task as completed
        Then the task "Task A" should be marked as completed


    Scenario: Uncomplete a task
        Given a completed task named "Task A" exists
        When I unmark the task as completed
        Then the task "Task A" should no longer be marked as completed


    Scenario: Delete a task
        Given a task named "Task A" exists
        When I delete the task
        Then the task "Task A" should not be displayed in the task list


    Scenario: Create multiple tasks
        Given the Todo application is open
        When I create a task with the name "Task A"
        And I create a task with the name "Task B"
        And I create a task with the name "Task C"
        Then the task "Task A" should be displayed in the task list
        And the task "Task B" should be displayed in the task list
        And the task "Task C" should be displayed in the task list


    Scenario: Complete one task from multiple tasks
        Given a task named "Task A" exists
        And a task named "Task B" exists
        And a task named "Task C" exists
        When I mark the task "Task B" as completed
        Then the task "Task B" should be marked as completed
        But the task "Task A" should not be marked as completed
        And the task "Task C" should not be marked as completed


    Scenario: Delete one task from multiple tasks
        Given a task named "Task A" exists
        And a task named "Task B" exists
        And a task named "Task C" exists
        When I delete the task "Task B"
        Then the task "Task B" should not be displayed in the task list
        But the task "Task A" should still be displayed in the task list
        And the task "Task C" should still be displayed in the task list


    Scenario: Filter by Active tasks
        Given a task named "Task A" exists
        And a completed task named "Task B" exists
        When I filter the task list by "Active"
        Then the task "Task A" should be displayed in the task list
        But the task "Task B" should not be displayed


    Scenario: Filter by Completed tasks
        Given a task named "Task A" exists
        And a completed task named "Task B" exists
        When I filter the task list by "Completed"
        Then the task "Task B" should be displayed in the task list
        But the task "Task A" should not be displayed


    Scenario: Filter by All tasks
        Given a task named "Task A" exists
        And a completed task named "Task B" exists
        When I filter the task list by "All"
        Then the task "Task A" should be displayed in the task list
        And the task "Task B" should be displayed in the task list


    Scenario: Clear completed tasks
        Given a task named "Task A" exists
        And a completed task named "Task B" exists
        When I clear all completed tasks
        Then the task "Task A" should be displayed in the task list
        And the task "Task B" should not be displayed in the task list