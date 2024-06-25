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

  updateTodoTitle(myTodo: Todo, newTitle: string) {
    return this.http.put<Todo>('https://jsonplaceholder.typicode.com/todos' + '/' + myTodo.id, {
      userId: myTodo.userId,
      id: myTodo.id,
      title: newTitle,
      completed: myTodo.completed
    }).pipe(
      tap(() => {
        this.todos.update((todos) => {
          const todosWithoutUpdated = todos.filter(t => t.id !== myTodo.id);
          return [{...myTodo, title: newTitle}, ...todosWithoutUpdated]
        })
      })
    )
  }

  updateTodoComplete(myTodo: Todo, completion:  boolean) {
    return this.http.put<Todo>('https://jsonplaceholder.typicode.com/todos' + '/' + myTodo.id, {
      userId: myTodo.userId,
      id: myTodo.id,
      title: myTodo.title,
      completed: completion
    }).pipe(
      tap(() => {
        this.todos.update((todos) => {
          const todosWithoutUpdated = todos.filter(t => t.id !== myTodo.id);
          return [{...myTodo, completed:completion}, ...todosWithoutUpdated]
        })
      })
    )
  }

}
