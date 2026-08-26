# Todo Task Management Application — Gherkin Test Plan

## Feature

Feature: Todo task management application

```
As a user
I want to manage my tasks
So that I can keep track of my progress

Background:
    Given the Todo application is open


# ============================================================
# TASK CREATION
# ============================================================

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
    And 3 tasks should be displayed in the task list


Scenario: Create an empty task
    When I attempt to create a task with an empty name
    Then no tasks should be displayed in the task list


Scenario: Create a task containing only spaces
    When I attempt to create a task with the name "   "
    Then no tasks should be displayed in the task list


Scenario: Create duplicate tasks
    When I create a task with the name "Task A"
    And I create another task with the name "Task A"
    Then 2 tasks named "Task A" should be displayed in the task list


# ============================================================
# TASK COMPLETION
# ============================================================

Scenario: Create a task as active by default
    When I create a task with the name "Task A"
    Then the task "Task A" should not be marked as completed


Scenario: Complete a task
    Given a task named "Task A" exists
    When I mark the task "Task A" as completed
    Then the task "Task A" should be marked as completed


Scenario: Uncomplete a task
    Given a task named "Task A" exists
    And the task "Task A" is completed
    When I unmark the task "Task A" as completed
    Then the task "Task A" should not be marked as completed


Scenario: Complete and uncomplete the same task multiple times
    Given a task named "Task A" exists
    When I mark the task "Task A" as completed
    Then the task "Task A" should be marked as completed
    When I unmark the task "Task A" as completed
    Then the task "Task A" should not be marked as completed
    When I mark the task "Task A" as completed
    Then the task "Task A" should be marked as completed


Scenario: Complete only the selected task
    Given a task named "Task A" exists
    And a task named "Task B" exists
    And a task named "Task C" exists
    When I mark the task "Task B" as completed
    Then the task "Task B" should be marked as completed
    And the task "Task A" should not be marked as completed
    And the task "Task C" should not be marked as completed


# ============================================================
# TOGGLE ALL TASKS
# ============================================================

Scenario: Complete all tasks
    Given a task named "Task A" exists
    And a task named "Task B" exists
    And a task named "Task C" exists
    When I mark all tasks as completed
    Then the task "Task A" should be marked as completed
    And the task "Task B" should be marked as completed
    And the task "Task C" should be marked as completed


Scenario: Uncomplete all completed tasks
    Given a task named "Task A" exists
    And a task named "Task B" exists
    And a task named "Task C" exists
    And all tasks are completed
    When I mark all tasks as active
    Then the task "Task A" should not be marked as completed
    And the task "Task B" should not be marked as completed
    And the task "Task C" should not be marked as completed


Scenario: Complete all tasks when some tasks are already completed
    Given a task named "Task A" exists
    And a task named "Task B" exists
    And a task named "Task C" exists
    And the task "Task A" is completed
    When I mark all tasks as completed
    Then the task "Task A" should be marked as completed
    And the task "Task B" should be marked as completed
    And the task "Task C" should be marked as completed


# ============================================================
# TASK DELETION
# ============================================================

Scenario: Delete an active task
    Given a task named "Task A" exists
    When I delete the task "Task A"
    Then the task "Task A" should not be displayed in the task list


Scenario: Delete a completed task
    Given a task named "Task A" exists
    And the task "Task A" is completed
    When I delete the task "Task A"
    Then the task "Task A" should not be displayed in the task list


Scenario: Delete only the selected task
    Given a task named "Task A" exists
    And a task named "Task B" exists
    And a task named "Task C" exists
    When I delete the task "Task B"
    Then the task "Task B" should not be displayed in the task list
    And the task "Task A" should still be displayed in the task list
    And the task "Task C" should still be displayed in the task list
    And 2 tasks should be displayed in the task list


Scenario: Delete all tasks
    Given a task named "Task A" exists
    And a task named "Task B" exists
    And a task named "Task C" exists
    When I delete the task "Task A"
    And I delete the task "Task B"
    And I delete the task "Task C"
    Then no tasks should be displayed in the task list


# ============================================================
# TASK FILTERS
# ============================================================

Scenario: Display only active tasks
    Given a task named "Task A" exists
    And a completed task named "Task B" exists
    When I filter the task list by "Active"
    Then the task "Task A" should be displayed in the task list
    And the task "Task B" should not be displayed


Scenario: Display only completed tasks
    Given a task named "Task A" exists
    And a completed task named "Task B" exists
    When I filter the task list by "Completed"
    Then the task "Task B" should be displayed in the task list
    And the task "Task A" should not be displayed


Scenario: Display all active and completed tasks
    Given a task named "Task A" exists
    And a completed task named "Task B" exists
    When I filter the task list by "All"
    Then the task "Task A" should be displayed in the task list
    And the task "Task B" should be displayed in the task list


Scenario: Display no tasks in Active filter when all tasks are completed
    Given a completed task named "Task A" exists
    And a completed task named "Task B" exists
    When I filter the task list by "Active"
    Then no tasks should be displayed


Scenario: Display no tasks in Completed filter when all tasks are active
    Given a task named "Task A" exists
    And a task named "Task B" exists
    When I filter the task list by "Completed"
    Then no tasks should be displayed


Scenario: Display all tasks when all tasks are active and Active filter is selected
    Given a task named "Task A" exists
    And a task named "Task B" exists
    When I filter the task list by "Active"
    Then the task "Task A" should be displayed in the task list
    And the task "Task B" should be displayed in the task list


Scenario: Display all tasks when all tasks are completed and Completed filter is selected
    Given a completed task named "Task A" exists
    And a completed task named "Task B" exists
    When I filter the task list by "Completed"
    Then the task "Task A" should be displayed in the task list
    And the task "Task B" should be displayed in the task list


Scenario: Switch correctly between task filters
    Given a task named "Task A" exists
    And a completed task named "Task B" exists
    When I filter the task list by "Active"
    Then the task "Task A" should be displayed in the task list
    And the task "Task B" should not be displayed
    When I filter the task list by "Completed"
    Then the task "Task B" should be displayed in the task list
    And the task "Task A" should not be displayed
    When I filter the task list by "All"
    Then the task "Task A" should be displayed in the task list
    And the task "Task B" should be displayed in the task list


# ============================================================
# CLEAR COMPLETED TASKS
# ============================================================

Scenario: Clear completed tasks only
    Given a task named "Task A" exists
    And a completed task named "Task B" exists
    When I clear all completed tasks
    Then the task "Task A" should still be displayed in the task list
    And the task "Task B" should not be displayed in the task list


Scenario: Clear multiple completed tasks
    Given a task named "Task A" exists
    And a completed task named "Task B" exists
    And a completed task named "Task C" exists
    When I clear all completed tasks
    Then the task "Task A" should still be displayed in the task list
    And the task "Task B" should not be displayed in the task list
    And the task "Task C" should not be displayed in the task list
    And 1 task should be displayed in the task list


Scenario: Clear completed tasks when no completed tasks exist
    Given a task named "Task A" exists
    And a task named "Task B" exists
    When I attempt to clear completed tasks
    Then the task "Task A" should still be displayed in the task list
    And the task "Task B" should still be displayed in the task list


Scenario: Clear completed tasks while Completed filter is selected
    Given a task named "Task A" exists
    And a completed task named "Task B" exists
    And the "Completed" filter is selected
    When I clear all completed tasks
    Then the task "Task B" should not be displayed in the task list
    When I select the "All" filter
    Then the task "Task A" should be displayed in the task list


# ============================================================
# UI VALIDATION
# ============================================================

Scenario: Display the task input field
    Then the task input field should be displayed


Scenario: Display all task filters
    Given a task named "Task A" exists
    Then the "All" filter should be displayed
    And the "Active" filter should be displayed
    And the "Completed" filter should be displayed


Scenario: Display a created task with its controls
    Given a task named "Task A" exists
    Then the task "Task A" should be displayed in the task list
    And the checkbox for task "Task A" should be displayed
    When I hover over task "Task A"
    Then the delete button for task "Task A" should be displayed


Scenario: Display the Clear Completed button when a task is completed
    Given a task named "Task A" exists
    When I mark the task "Task A" as completed
    Then the Clear Completed button should be displayed
```
