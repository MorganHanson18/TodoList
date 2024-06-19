import { Routes } from '@angular/router';
import {TodoListComponent} from './todo-list/todo-list.component';
import {DetailsComponent} from './details/details.component';

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
    }
];

export default routeConfig;
