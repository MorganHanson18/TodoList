import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodosService } from './todos.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <main>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styles: [],
})
export class AppComponent {
  title = 'todo';
  private todosService = inject(TodosService);

  constructor() {
    this.todosService.getTodos().pipe(takeUntilDestroyed()).subscribe((response: Todo[]) => {
      this.todosService.todos.set(response)
    })
}
}
