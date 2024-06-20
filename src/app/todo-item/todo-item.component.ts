import { Component, Input, input} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Todo } from '../todo.interface';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  todo = input<Todo>();
}
