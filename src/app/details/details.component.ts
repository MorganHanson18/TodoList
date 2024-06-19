import { Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import{Todo} from '../todo.interface'
import {TodosService} from '../todos.service'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  todoTitle?: string
  todoUser?: number
  todoId?: number
  todoCompleted?: boolean;
  todosService = inject(TodosService);

  constructor() {
    //this.habitId = (this.route.snapshot.params['id']);
    this.todosService.getTodo(this.route.snapshot.params['id']).subscribe((response: Todo) => {
      this.todoTitle = response.title
      this.todoUser = response.userId
      this.todoId = response.id
      this.todoCompleted = response.completed
    })
  }
}

//git commit test