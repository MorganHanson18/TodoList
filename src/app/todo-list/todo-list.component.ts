import { Component, inject } from '@angular/core';
import { NgFor, CommonModule } from '@angular/common';
import {TodosService} from '../todos.service';
import { Todo } from '../todo.interface';
import {TodoItemComponent} from '../todo-item/todo-item.component';


@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [TodoItemComponent, NgFor, CommonModule],
    template: `
      <h1>TODO LIST</h1>
      <ul>
        <app-todo-item *ngFor='let todo of todos' [todo]="todo"></app-todo-item>
      </ul>
    `,
    styleUrls: ['./todo-list.css']
  })

export class TodoListComponent {
    todos = [] as Todo[];
    TodosService = inject(TodosService);
    constructor() {
        this.TodosService.getTodos().subscribe((response: Todo[]) => {
            this.todos = response.map((todo) => {
                return {userId: todo.userId, id: todo.id, title: todo.title, completed: todo.completed}
            })
        })
    }
}