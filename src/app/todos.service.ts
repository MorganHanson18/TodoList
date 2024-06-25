import {HttpClient} from '@angular/common/http'
import { Injectable, inject, signal } from '@angular/core';
import { Todo } from './todo.interface';
import { tap } from 'rxjs';

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
    return this.todos().find(t => t.id === Number(id))
  }

  updateTodo(myTodo: Todo, payload: Partial<Todo>) {
    const updatedTodo = {...myTodo, ...payload};
    return this.http.put<Todo>('https://jsonplaceholder.typicode.com/todos' + '/' + myTodo.id, updatedTodo)
    .pipe(
      tap(() => {
        this.todos.update((todos) => {
          return todos.map((todo) => {
            return todo.id !== myTodo.id ? todo : updatedTodo
          })
        })
      })
    )
  
  }

  removeTodo(myTodo: Todo) {
    return
  }

}
