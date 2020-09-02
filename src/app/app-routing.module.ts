import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './gaurd';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./component/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'todo',
        loadChildren:  () => import('./component/todo/todo.module').then(m => m.TodoModule),
        canActivate: [LoginGuard]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
