import { Component, inject } from '@angular/core';
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
      <ul>
        @for (todo of todos; track todo.id) {
          <app-todo-item [todo]="todo"></app-todo-item>
        }
      </ul>
    `,
    styleUrls: ['./todo-list.css']
  })

export class TodoListComponent {
    todos = [] as Todo[];
    TodosService = inject(TodosService);
    constructor() {
        this.TodosService.getTodos().pipe(takeUntilDestroyed()).subscribe((response: Todo[]) => {
          this.todos = response
        })
    }
}
