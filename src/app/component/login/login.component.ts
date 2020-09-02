import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TodoService } from 'src/app/services/todo.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
     loginForm: FormGroup;
     isLoggedIn: boolean;
     error: string;
    constructor(public router: Router, public loginService: LoginService, public todoService: TodoService) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        });
        this.error = '';
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.logIn();
            this.router.navigate(['/todo']);
        }
    }

    logIn(): void {
        const password = this.loginForm.get('password').value;
        if (password === '12345' && this.loginForm.valid) {
            this.loginService.login()
                .subscribe((isLoggedIn) => {
                    this.isLoggedIn = isLoggedIn;
                    const redirect = this.loginService.redirectUrl ? this.loginService.redirectUrl :
                        '/';
                    this.todoService.setEmail(this.loginForm.get('email').value);
                    this.router.navigate([redirect]);
                });
        } else {
            this.error = 'Please Enter Valid credentials';
        }

    }



}
