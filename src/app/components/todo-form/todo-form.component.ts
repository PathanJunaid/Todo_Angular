import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Add SnackBar
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule // Add this
  ],
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  todoForm;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar // Inject SnackBar
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.todoForm.valid) {
      this.isLoading = true;
      const user = this.authService.getCurrentUser();
      if (!user) {
        this.router.navigate(['/login']);
        return;
      }

      const { title, description } = this.todoForm.value;
      const todo: Todo = {
        id: Date.now().toString(),
        title: title || '',
        description: description || '',
        completed: false,
        userId: user.id,
        createdAt: new Date()
      };

      this.todoService.addTodo(todo);
      this.snackBar.open('Todo added successfully!', 'Close', {
        duration: 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
      this.isLoading = false;
      this.router.navigate(['/todos']);
    } else {
      this.todoForm.markAllAsTouched(); // Show errors if invalid
    }
  }
}