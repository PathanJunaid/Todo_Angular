import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; // Add this
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, // Add this
    ReactiveFormsModule
  ],
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  isLoading = true;
  displayedColumns: string[] = ['completed', 'title', 'description', 'delete'];
  activeFilter: 'all' | 'completed' | 'pending' = 'pending';
  searchControl = new FormControl('');
  searchQuery: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    setTimeout(() => {
      this.todos = this.todoService.getTodos();
      this.filterTodos('pending');
      this.isLoading = false;
    }, 1000);

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.searchQuery = value?.trim().toLowerCase() || '';
        this.applyFilterAndSearch();
      });
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo);
    this.applyFilterAndSearch();
  }

  deleteTodo(todo: Todo) {
    const updatedTodos = this.todos.filter(t => t.id !== todo.id);
    this.todos = updatedTodos;
    this.todoService.updateTodoList(updatedTodos);
    this.applyFilterAndSearch();
  }

  filterTodos(status: 'all' | 'completed' | 'pending') {
    this.activeFilter = status;
    this.applyFilterAndSearch();
  }

  applyFilterAndSearch() {
    let tempTodos = this.todos;

    tempTodos = tempTodos.filter(todo => {
      if (this.activeFilter === 'all') return true;
      return this.activeFilter === 'completed' ? todo.completed : !todo.completed;
    });

    if (this.searchQuery) {
      tempTodos = tempTodos.filter(todo =>
        todo.title.toLowerCase().includes(this.searchQuery)
      );
    }

    this.filteredTodos = tempTodos;
  }
}