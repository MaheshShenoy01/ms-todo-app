import { Component } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To Do App';
  constructor( public location: LocationStrategy) {
  this.preventBackAndForwardButton();
  }
  public preventBackAndForwardButton(): void {
    this.location.onPopState(() => {
      window.history.go(1);
      window.onunload = function () { null };
    });
  }
}
