import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { TodoService } from './todo.service';

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
];



const PROVIDERS = [
  ApiService,
  ConfigService,
  TodoService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [

  ],
  exports: [

  ],
  providers: [PROVIDERS]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [PROVIDERS]
    };
  }
}
