import { Routes } from '@angular/router';
import {TodoListComponent} from './todo-list/todo-list.component';
import {DetailsComponent} from './details/details.component';
import { NewTodoComponent } from './new-todo/new-todo.component';

export const routeConfig: Routes = [
    {
        path: ``,
        component: TodoListComponent,
        title: 'Todos'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Todo Details'
    },
    {
        path: 'new-todo',
        component: NewTodoComponent,
        title: 'New Todo'
    }
];

export default routeConfig;
