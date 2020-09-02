import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './gaurd';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: './component/login/login.module#LoginModule'
    },
    {
        path: 'todo',
        loadChildren: './component/todo/todo.module#TodoModule',
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
