import { Component, Input, inject, input, signal} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Todo } from '../todo.interface';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  todo = input.required<Todo>()  
  todosService = inject(TodosService);
  loading = this.todosService.loading;

  constructor() {}
  onCompletionChange(event: Event) {
    this.loading.set(true)
    const checked = (event.target as HTMLInputElement).checked;
    const current = this.todo();
    if (current) {
      this.loading.set(false)
      this.todosService.updateTodo(current, {completed: checked}).subscribe();
    }
  }

}
