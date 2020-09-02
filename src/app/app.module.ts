import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from './services/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';


import { ColorPickerModule } from 'ngx-color-picker';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginGuard } from './gaurd';
import { LoginService } from './services/login.service';
import { todoReducers } from './store/reducers/todo.reducer';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({
      todos: todoReducers
    }, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
      }
    },
    ),
    BrowserAnimationsModule,
    ColorPickerModule
  ],
  providers: [LoginService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
