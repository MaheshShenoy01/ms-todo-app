import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { LoginService } from 'src/app/services/login.service';
import { Subscription } from 'rxjs';
import { todo } from 'src/app/store/models/todo.model';

import { Cmyk, ColorPickerService } from 'ngx-color-picker';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit, OnDestroy {
    public todoListDetails: todo[];
    public todoSubScription: Subscription;
    public isSubmited;
    public todo: todo;
    public isLoggedIn: boolean;
    public tasks: todo[];
    public activeRecords: todo[];
    public enableEdit;
    public enableEditIndex;
    public editedTask;
    public totalCount;
    public arrayColors: any ;
    public color1: any ;
    public cmykValue: string;
    public emailId: string;
    public cmykColor: Cmyk;


    constructor(private router: Router, private todoService: TodoService, public loginService: LoginService,
        private cpService: ColorPickerService, public translate: TranslateService) {
        this.todo = {} as todo;
        this.tasks = [];
        this.activeRecords = [];
        this.enableEdit = false;
        this.enableEditIndex = null;
        this.editedTask = '';
        this.totalCount = 0;
        this.cmykValue = '';
        this.emailId = '';
        this.cmykColor = new Cmyk(0, 0, 0, 0);
        this.isSubmited = false;
        this.arrayColors = {
            color1: '#2883e9'
        };

    }

    public ngOnInit() {
        this.emailId = this.todoService.getEmail();
        this.translate.addLangs(['en', 'hn']);
        this.translate.setDefaultLang('en');

        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|vi|hn/) ? browserLang : 'en');
    }

    public onSubmitAddForm(form): void {
        if (form.valid) {
            this.isSubmited = true;
            this.todo.active = false;
            this.todoService.add(this.todo);
            this.todoSubScription = this.todoService.list().subscribe(list => { this.todoListDetails = list; });
            this.tasks = this.todoListDetails;
            this.todo = {} as todo;
            this.taskCountleft();
        }
    }

    public enableEditMethod(e: Event, i): boolean {
        e.preventDefault();
        this.enableEdit = true;
        this.enableEditIndex = i;
        return true;
    }

    public editRecord(event: any, id): void {

        for (const task of this.tasks) {
            if (task.id === id) {

                if (event.target.checked) {
                    task.active = true;
                    this.activeRecords.push(task);
                } else {
                    task.active = false;
                    this.activeRecords = this.activeRecords.filter(record => {
                        return record.id !== id;
                    });
                }

            }
        }
        this.taskCountleft();
    }
    public markChecked(id): todo[] {
        return this.tasks.filter(task => {
            if (task.id === id) {
                return task.active;
            }
        });
    }
    public saveTask(id, task): void {
        this.todoService.edit(id, task);
        console.log(id, task);
        this.enableEdit = false;
    }


    public deleteRecord(id): void {
        this.todoService.remove(id);
        this.todoSubScription = this.todoService.list().subscribe(list => { this.todoListDetails = list; });
        this.tasks = this.todoListDetails;
        this.taskCountleft();
    }

    public cancelEditTask(id): void {
        this.tasks = this.todoListDetails;
    }

    public processRecords(option): void {
        switch (option) {
            case 'All':
                this.tasks = this.todoListDetails;

                break;
            case 'Active':
                this.tasks = this.todoListDetails.filter(task => {
                    return task.active === false;
                });

                break;
            case 'Completed':
                this.tasks = this.todoListDetails.filter(task => {
                    return task.active === true;
                });

                break;
            case 'Clear':
                this.todoListDetails = this.todoListDetails.filter(task => {
                    if (!task.active) {
                        return task;
                    } else {
                        this.todoService.remove(task.id);
                    }
                });
                this.tasks = this.todoListDetails;
                this.totalCount = this.tasks.length;

                break;
            default:
                break;
        }
    }

    public taskCountleft() {
        if (this.tasks && this.tasks.length > 0 && this.tasks.length >= this.activeRecords.length) {
            this.totalCount = this.tasks.length - this.activeRecords.length;
        }

    }
    public checkAll(event: any): void {
        this.tasks = this.todoListDetails.filter(task => {
            event.target.checked ? task.active = true : task.active = false;
            return task;
        });
        event.target.checked ? this.totalCount = 0 : this.totalCount = this.tasks.length;
    }

    public logout(): void {
        this.loginService.logout()
            .subscribe((isLoggedIn) => {
                this.isLoggedIn = isLoggedIn;
                this.router.navigate(['/login']);
            });
    }

    public onChangeColorHex8(color: string): string {
        const hsva = this.cpService.stringToHsva(color, true);

        if (hsva) {
            return this.cpService.outputFormat(hsva, 'rgba', null);
        }

        return '';
    }

    public ngOnDestroy(): void {
        this.todoSubScription.unsubscribe();
    }

}
