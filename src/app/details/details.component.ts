import { Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import{Todo} from '../todo.interface'
import {TodosService} from '../todos.service'
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  todo = signal<Todo|null>(null);
  todosService = inject(TodosService);

  applyForm = new FormGroup({
    title: new FormControl(''),
  });

  constructor() {
    this.todosService.getTodo(this.route.snapshot.params['id']).pipe(takeUntilDestroyed()).subscribe((response: Todo) => {
      this.todo.set(response)
    })
  }

  submitApplication() {
    const updatedTitle = this.applyForm.value.title ?? '';
    let current = this.todo()
    if (current) {
      current.title = updatedTitle;
      this.todo.set(current)
      this.todosService.submitApplication(updatedTitle, current.id);
    }
  }
}