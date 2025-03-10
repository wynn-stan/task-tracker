# Task-It: Task Tracker Application

## Overview

This is a simple task tracker application built using **Next.js, React, TypeScript, and the Context API**. It allows users to manage a list of tasks, filter them by priority, and persist data in **localStorage**. The project follows best practices in **state management, modular component design, and UI styling**.

## Live Demo

You can check out a live demo of the application here: [Task Tracker Demo](https://task-tracker-jet-xi.vercel.app/)

## Features

- **Task Management:** Users can **add, edit, and delete** tasks.
- **Priority Filtering:** A dropdown allows filtering tasks by priority (**Low, Medium, High**).
- **Context API:** Used for global state management of tasks and filters.
- **Data Persistence:** Tasks are stored in **localStorage** and retrieved on page load.
- **Clean UI:** Styled using CSS for a simple and inviting interface.

### Bonus Features (Optional)

- **Search Functionality:** Users can search for tasks by title or description.
- **Drag-and-Drop Support:** Allows reordering of tasks.

## Project Approach

My approach to building this task tracker focused on creating a well-structured, maintainable application with a thoughtful user experience:

1. **Initial Design Phase**: I began by creating comprehensive design documents as a reference point. This upfront investment in planning helped minimize complications during development and ensured a cohesive final product.

2. **Technology Selection**: I chose NextJS + React + TypeScript as the primary tech stack because:

   - NextJS provides helpful patterns for structuring code
   - React offers a robust component model
   - TypeScript ensures type safety throughout the application

3. **Foundation Setup**: Before diving into feature development, I established a solid codebase foundation:

   - Configured the development environment
   - Set up generic/reusable components
   - Implemented base styling
   - Installed necessary packages
   - Validated the base setup was functioning correctly

4. **Modular Development**: I implemented different views according to my design documents, focusing on:

   - Modular and extensible components
   - Following React and NextJS design patterns
   - Creating clear separation of concerns

5. **State Management**: I created a global context store to manage task states throughout the application:
   - Connected to browser's localStorage for data persistence
   - Defined specific action functions for each operation type (add, edit, delete, filter)
   - Established a clean API for components to interact with the state

## Installation & Running Locally

### Prerequisites

- **Node.js (v14 or later)**
- **Yarn package manager**

1. Clone the repository:
   ```sh
   git clone https://github.com/wynn-stan/task-tracker.git
   ```
2. Navigate into the project directory:
   ```sh
   cd task-tracker
   ```
3. Install dependencies:
   ```sh
   yarn install
   ```
4. Start the development server:
   ```sh
   yarn dev
   ```
   This will start the app on `http://localhost:3000`.

## Code Structure

- **`/app`** - Next.js app pages.
- **`/components`** - Reusable UI components.
- **`/hooks`** - Utility hooks used throughout the project for scalability
- **`/interfaces`** - Helper interfaces for the project (ModalProps, TPriorityFilter)
- **`/models`** - Defined Interfaces for entities in the project (TaskModel, CommentModel)
- **`/providers`** - Providers Context API setup for the project (App, Layout, Store).
- **`/routes`** - Navigation routes for the project.
- **`/styles`** - Sass styling.
- **`/utils`** - Helper functions.

## Notes on State Management

I implemented state management using React's Context API with the following considerations:

1. **Store Context**: Manages the collection of tasks and provides methods for:

   - Adding new tasks
   - Updating existing tasks
   - Deleting tasks
   - Retrieving all tasks

2. **Layout Context**: Handles the current priority filter state, allowing components to:

   - Get the current filter setting
   - Update the filter selection
   - Get filtered tasks based on the current selection

3. **Local Storage Integration**: Created a custom hook (`useLocalStorage`) that:
   - Synchronizes the context state with localStorage
   - Loads data on application startup
   - Updates localStorage whenever state changes

This approach keeps the state logic separated from the UI components, making the code more maintainable and testable.

---

Made by Winston Lamptey
