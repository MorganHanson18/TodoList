import { Component, computed, inject, signal} from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import {TodosService} from '../todos.service';
import { Todo } from '../todo.interface';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [TodoItemComponent, NgFor, CommonModule],
    template: `
      <h1>TODO LIST</h1>
      <p>Total Todos: {{todos().length}}</p>
      <p>Completed Todos: {{completed()}}</p>
      <p>Uncompleted Todos: {{uncompleted()}}</p>
      <ul>
        @for (todo of todos(); track todo.id) {
          <app-todo-item [todo]="todo"></app-todo-item>
        }
      </ul>
    `,
    styleUrls: ['./todo-list.css']
  })

export class TodoListComponent {
    TodosService = inject(TodosService);
    todos = this.TodosService.todos;

    completed = computed(() => {
      return this.todos().filter(todo => todo.completed).length;
    });
  
    uncompleted= computed(() => {
      return this.todos().filter(todo => !todo.completed).length;
    });

    constructor() {
        this.TodosService.getTodos().pipe(takeUntilDestroyed()).subscribe((response: Todo[]) => {
          this.todos.set(response)
        })
    }
}
