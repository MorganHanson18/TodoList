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
  loading = signal<boolean>(false)

  getTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
  }

  getTodo(id: string) {
    return this.todos().find(t => t.id === Number(id))
  }

  updateTodo(myTodo: Todo, payload: Partial<Todo>) {
    this.loading.set(true);
    const updatedTodo = {...myTodo, ...payload};
    
    return this.http.put<Todo>('https://jsonplaceholder.typicode.com/todos' + '/' + myTodo.id, updatedTodo)
    .pipe(
      tap(() => {
        this.todos.update((todos) => {
          return todos.map((todo) => {
            this.loading.set(false);
            return todo.id !== myTodo.id ? todo : updatedTodo
          })
        })
      })
    )
  
  }

  removeTodo(myTodo: Todo) {
    this.loading.set(true);
    return this.http.delete('https://jsonplaceholder.typicode.com/todos' + '/' + myTodo.id)
      .pipe(
        tap(() => {
          this.todos.update((todos) => {
            this.loading.set(false);
            return todos.filter(todo => todo.id !== myTodo.id);
          });
        })
      );
  }

  maxId() {
    const max = this.todos().map(todo => todo.id);
    return Math.max(...max) + 1
  }

  newTodo(title: string, user: number) {

    const newTodo: Todo = {
      userId: user,
      id: this.maxId(),
      title: title,
      completed: false
    };

    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
      .pipe(
        tap((createdTodo) => {
          this.todos.update((todos) => [...todos, createdTodo]);
        })
      );
  }
}