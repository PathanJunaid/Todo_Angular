// todo.service.ts
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class TodoService {
    constructor(private authService: AuthService) { }

    getTodos(): Todo[] {
        const user = this.authService.getCurrentUser();
        if (!user) return [];
        return JSON.parse(localStorage.getItem(`todos_${user.id}`) || '[]');
    }

    addTodo(todo: Todo) {
        const todos = this.getTodos();
        todos.push(todo);
        localStorage.setItem(`todos_${todo.userId}`, JSON.stringify(todos));
    }

    updateTodo(todo: Todo) {
        const todos = this.getTodos().map(t => t.id === todo.id ? todo : t);
        localStorage.setItem(`todos_${todo.userId}`, JSON.stringify(todos));
    }
    updateTodoList(todos: Todo[]) {
        const user = this.authService.getCurrentUser();
        if (user) {
            localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
        }
    }
}