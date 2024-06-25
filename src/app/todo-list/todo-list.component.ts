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
      <p>Completed Todos: {{completed().length}}</p>
      <p>Uncompleted Todos: {{uncompleted().length}}</p>
      <div class="list">
        <div>
          <h2>Uncompleted:</h2>
          <ul class="todo undone">
            @for (todo of uncompleted(); track todo.id) {
              <app-todo-item [todo]="todo"></app-todo-item>
            }
          </ul>
        </div>
        <div>
          <h2>Completed:</h2>
          <ul class="todo done">
            @for (todo of completed(); track todo.id) {
              <app-todo-item [todo]="todo"></app-todo-item>
            }
          </ul>
        </div>
      </div>

    `,
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
