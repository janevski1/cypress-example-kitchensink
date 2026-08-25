Feature: Todo task management application

    As a user
    I want to manage my tasks
    So that I can keep track of my progress


    Background:
        Given the Todo application is open


    # Task creation

    Scenario Outline: Create a new task with different valid task names
        When I create a task with the name "<taskName>"
        Then the task "<taskName>" should be displayed in the task list
        And the task "<taskName>" should be active by default

        Examples:
        | taskName                    |
        | Task A                      |
        | Buy groceries               |
        | Task 123                    |
        | Task #1!                    |
        | Test automation - Playwright |


    Scenario: Create multiple tasks
        When I create a task with the name "Task A"
        And I create a task with the name "Task B"
        And I create a task with the name "Task C"
        Then the task "Task A" should be displayed in the task list
        And the task "Task B" should be displayed in the task list
        And the task "Task C" should be displayed in the task list


    Scenario: Create a duplicate task
        Given a task named "Task A" exists
        When I create another task with the name "Task A"
        Then the duplicate task behavior should match the application requirements


    Scenario: Create a task with an empty name
        When I attempt to create a task with an empty name
        Then an empty task should not be created


    Scenario: Create a task containing only spaces
        When I attempt to create a task with the name "   "
        Then a task containing only spaces should not be created


    Scenario: Create a task with leading and trailing spaces
        When I create a task with the name "  Task A  "
        Then the task name should be handled according to the application requirements


    Scenario: Create a task with a long name
        When I create a task with a long name
        Then the task should be handled according to the application requirements


    # Task completion

    Scenario: Complete a task
        Given a task named "Task A" exists
        When I mark the task as completed
        Then the task "Task A" should be marked as completed


    Scenario: Uncomplete a task
        Given a completed task named "Task A" exists
        When I unmark the task as completed
        Then the task "Task A" should no longer be marked as completed


    Scenario: Complete and uncomplete the same task
        Given a task named "Task A" exists
        When I mark the task as completed
        And I unmark the task as completed
        Then the task "Task A" should be active


    Scenario: Complete the same task multiple times
        Given a task named "Task A" exists
        When I mark the task as completed
        And I unmark the task as completed
        And I mark the task as completed
        Then the task "Task A" should be marked as completed


    Scenario: Complete one task from multiple tasks
        Given a task named "Task A" exists
        And a task named "Task B" exists
        And a task named "Task C" exists
        When I mark the task "Task B" as completed
        Then the task "Task B" should be marked as completed
        But the task "Task A" should not be marked as completed
        And the task "Task C" should not be marked as completed


    # Task deletion

    Scenario: Delete a task
        Given a task named "Task A" exists
        When I delete the task
        Then the task "Task A" should not be displayed in the task list


    Scenario: Delete a completed task
        Given a completed task named "Task A" exists
        When I delete the task
        Then the task "Task A" should not be displayed in the task list


    Scenario: Delete one task from multiple tasks
        Given a task named "Task A" exists
        And a task named "Task B" exists
        And a task named "Task C" exists
        When I delete the task "Task B"
        Then the task "Task B" should not be displayed in the task list
        But the task "Task A" should still be displayed in the task list
        And the task "Task C" should still be displayed in the task list


    # Filters

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


    Scenario: Filter Active tasks when all tasks are completed
        Given a completed task named "Task A" exists
        And a completed task named "Task B" exists
        When I filter the task list by "Active"
        Then no tasks should be displayed


    Scenario: Filter Completed tasks when all tasks are active
        Given a task named "Task A" exists
        And a task named "Task B" exists
        When I filter the task list by "Completed"
        Then no tasks should be displayed


    Scenario: Filter Active tasks when all tasks are active
        Given a task named "Task A" exists
        And a task named "Task B" exists
        When I filter the task list by "Active"
        Then the task "Task A" should be displayed in the task list
        And the task "Task B" should be displayed in the task list


    Scenario: Filter Completed tasks when all tasks are completed
        Given a completed task named "Task A" exists
        And a completed task named "Task B" exists
        When I filter the task list by "Completed"
        Then the task "Task A" should be displayed in the task list
        And the task "Task B" should be displayed in the task list


    Scenario: Switch between task filters
        Given a task named "Task A" exists
        And a completed task named "Task B" exists
        When I filter the task list by "Active"
        Then the task "Task A" should be displayed in the task list
        But the task "Task B" should not be displayed
        When I filter the task list by "Completed"
        Then the task "Task B" should be displayed in the task list
        But the task "Task A" should not be displayed
        When I filter the task list by "All"
        Then the task "Task A" should be displayed in the task list
        And the task "Task B" should be displayed in the task list


    # Clear completed tasks

    Scenario: Clear completed tasks
        Given a task named "Task A" exists
        And a completed task named "Task B" exists
        When I clear all completed tasks
        Then the task "Task A" should be displayed in the task list
        And the task "Task B" should not be displayed in the task list


    Scenario: Clear multiple completed tasks
        Given a task named "Task A" exists
        And a completed task named "Task B" exists
        And a completed task named "Task C" exists
        When I clear all completed tasks
        Then the task "Task A" should be displayed in the task list
        And the task "Task B" should not be displayed in the task list
        And the task "Task C" should not be displayed in the task list


    Scenario: Clear completed tasks when no completed tasks exist
        Given a task named "Task A" exists
        And a task named "Task B" exists
        When I attempt to clear completed tasks
        Then the task "Task A" should still be displayed in the task list
        And the task "Task B" should still be displayed in the task list


    # Application UI validation

    Scenario: Verify all basic Todo application controls are present
        Then the task input field should be displayed
        And the "All" filter should be displayed
        And the "Active" filter should be displayed
        And the "Completed" filter should be displayed


    Scenario: Verify the application state after all tasks are deleted
        Given a task named "Task A" exists
        When I delete the task "Task A"
        Then no tasks should be displayed