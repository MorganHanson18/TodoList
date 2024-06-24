import {HttpClient} from '@angular/common/http'
import { Injectable, inject, signal } from '@angular/core';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  http = inject(HttpClient)
  todos = signal<Todo[]>([]);

  getTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
  }

  getTodo(id: string) {
    return this.http.get<Todo>('https://jsonplaceholder.typicode.com/todos' + '/' + id)
  }

  updateTodoTitle(myTodo: Todo, newTitle: string) {
    return this.http.put<Todo>('https://jsonplaceholder.typicode.com/todos' + '/' + myTodo.id, {
      userId: myTodo.userId,
      id: myTodo.id,
      title: newTitle,
      completed: myTodo.completed
    });
  }

}
