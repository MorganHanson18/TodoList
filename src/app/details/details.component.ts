import { Component, inject, input, signal} from '@angular/core';
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
    this.todo.set(this.todosService.getTodo(this.route.snapshot.params['id'])!)
  }

  updateTodo() {
    const updatedTitle = this.applyForm.value.title ?? '';
    const current = this.todo();

    if (current) {
      this.todosService.updateTodo(current, { title: updatedTitle }).subscribe({
        next: () => {
          this.todo.set({ ...current, title: updatedTitle });
        }
      });
    }
  }

  removeTodo() {
    const current = this.todo();
    if (current) {
      this.todosService.removeTodo(current).subscribe({
        next: () => {
          history.back()
        }
      })
    }
  }
}