import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();
  redirectUrl: string;


  constructor(private router: Router) { }

  login(): Observable<boolean> {
    this.isLoggedIn.next(true);
    return this.isLoggedIn$;
  }

  logout(): Observable<boolean> {
    this.isLoggedIn.next(false);
    return this.isLoggedIn$;
  }

}
