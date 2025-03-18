
# ToDo App

A modern, responsive ToDo application built with Angular and Angular Material. This app allows users to register, log in, and manage their tasks (todos) with features like adding, toggling, deleting, filtering, and searching todos. Todos are stored locally using `localStorage` and tied to authenticated users.

## Features

- **User Authentication**: Register and log in with a username and password.
- **Task Management**:
  - Add new todos with a title and optional description.
  - Toggle todos as completed or pending.
  - Delete todos.
- **Filtering**: View all, completed, or pending todos with active filter highlighting.
- **Search**: Search todos by title with real-time filtering and a "No todo found" message.
- **Local Storage**: Todos persist in `localStorage` per user.
- **Routing**: Protected routes with an authentication guard.
- **SnackBar Feedback**: Success messages for adding todos.

## Prerequisites

- **Node.js**: v16.x or later
- **npm**: v8.x or later
- **Angular CLI**: Install globally with `npm install -g @angular/cli`

## Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   ng serve
   ```
   Open your browser at `http://localhost:4200`.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── login/
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.scss
│   │   ├── register/
│   │   │   ├── register.component.ts
│   │   │   ├── register.component.html
│   │   │   └── register.component.scss
│   │   ├── todo-form/
│   │   │   ├── todo-form.component.ts
│   │   │   ├── todo-form.component.html
│   │   │   └── todo-form.component.scss
│   │   └── todo-list/
│   │       ├── todo-list.component.ts
│   │       ├── todo-list.component.html
│   │       └── todo-list.component.scss
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── todo.service.ts
│   ├── models/
│   │   └── todo.model.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.routes.ts
│   └── app.config.ts
├── main.ts
└── index.html
```

- **Components**: Standalone components for login, registration, adding todos, and listing todos.
- **Services**: `AuthService` for authentication and `TodoService` for todo management.
- **Models**: `Todo` interface for todo structure.
- **Routing**: Defined in `app.routes.ts` with an `authGuard`.

## Routes

- `/login`: Login page (public).
- `/register`: Registration page (public).
- `/todos`: Todo list page (protected by `authGuard`).
- `/add-todo`: Add todo page (protected by `authGuard`).

## Authentication

- **Auth Guard**: Protects `/todos` and `/add-todo`. Redirects unauthenticated users to `/login`.
- **Local Storage**: User data is stored in `localStorage` under `currentUser`. Todos are stored as `todos_<userId>`.

## License

This project is unlicensed—free to use and modify as you see fit!

---
