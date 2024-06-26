import { Component, inject, input, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import{Todo} from '../todo.interface'
import {TodosService} from '../todos.service'
import { RouterModule } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css'],
})

export class NewTodoComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    todo = signal<Todo|null>(null);
    todosService = inject(TodosService);
    loading = this.todosService.loading;
  
    applyForm = new FormGroup({
      title: new FormControl(''),
      user: new FormControl(''),
    });
    
    newTodo() {
        const newTitle = this.applyForm.value.title ?? '';
        const newUser = this.applyForm.value.user ?? '';
        this.todosService.newTodo(newTitle, Number(newUser)).subscribe(() => history.back());;
    }

}