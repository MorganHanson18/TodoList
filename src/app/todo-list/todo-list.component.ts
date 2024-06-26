import { Component, computed, inject, signal} from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import {TodosService} from '../todos.service';
import { Todo } from '../todo.interface';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';



@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [TodoItemComponent, NgFor, CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './todo-list.html',
    styleUrls: ['./todo-list.css']
  })

export class TodoListComponent {
    TodosService = inject(TodosService);
    todos = this.TodosService.todos;
    loading = signal<boolean>(false);

    completed = computed(() => {
      return this.todos().filter(todo => todo.completed);
    });
  
    uncompleted= computed(() => {
      return this.todos().filter(todo => !todo.completed);
    });
  
  }
