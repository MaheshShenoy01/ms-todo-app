import { Injectable } from '@angular/core';


import * as TodoActions from './../store/actions/todo.actions';

import * as fromTodoReducer from './../store/reducers/todo.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Store, select } from '@ngrx/store';
import { AppState } from './../app.state';
import { todo } from '../store/models/todo.model';


@Injectable()
export class TodoService {

   allTodos;
   todoById;
   email: string;
  constructor(private store: Store<AppState>) {


    this.allTodos = createSelector(
      fromTodoReducer.selectAll,
      (entities) => {
        return entities;
      }
    );

    this.todoById = createSelector(fromTodoReducer.selectEntities,
      (entities: Dictionary<todo>, props: { id: number }) => {
        return entities[props.id];
      }
    );

  }

  public add(data: todo) {
    if (data && Object.keys(data).length > 0) {
      data.id = new Date().getTime();
      this.store.dispatch(new TodoActions.AddTodo(data));
    }

  }


  public list() {
    return this.store.pipe(select(this.allTodos));
  }

  public remove(id: number) {
    this.store.dispatch(new TodoActions.RemoveTodo(id));
  }



  public edit(id: number, changes: todo) {
    this.store.dispatch(new TodoActions.UpdateTodo(id, changes));
  }

  public setEmail(emailDetails: string) {
    this.email = emailDetails;
  }
  public getEmail() {
    return this.email;
  }
}
