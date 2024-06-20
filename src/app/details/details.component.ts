import { Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import{Todo} from '../todo.interface'
import {TodosService} from '../todos.service'
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  todo?: Todo;
  todosService = inject(TodosService);

  constructor() {
    //this.habitId = (this.route.snapshot.params['id']);
    this.todosService.getTodo(this.route.snapshot.params['id']).pipe(takeUntilDestroyed()).subscribe((response: Todo) => {
      this.todo = response
    })
  }
}