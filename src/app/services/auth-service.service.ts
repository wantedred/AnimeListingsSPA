import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = 'https://localhost:44314/Home/';

  loggedIn : boolean = false;

  public user: User;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('currentUser') && !this.loggedIn) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.loggedIn = true;
    }
  }

  public login(email: string, password: string) : Observable<User> {
    return this.http.post<User>(
      this.baseURL + 'login', 
      JSON.stringify({email, password}),
       this.httpOptions
    ).pipe(tap(data => {
      console.log("making request to get user logged in!");
      if (localStorage.getItem('currentUser')) {
        localStorage.removeItem('currentUser');
      }
      this.user = data;
      console.log("current user email: " + this.user.email);
      localStorage.setItem('currentUser', JSON.stringify(this.user));
      this.loggedIn = true;
    }));
  }

  /**
   * Checks if the user is logged, if the user is redirect
   * @param route By default it's the root route /, specify route to redirect user
   */
  public redirectOnLogin(route: string = '/') : void {
    if (this.loggedIn) {
      this.router.navigateByUrl(route);
    }
  }

  public register(user: User) : Observable<User> {
    return this.http.post<User>(this.baseURL + 'register', user, this.httpOptions);
  }

  /**
   * Removes the current user from the localstorage, and sets the user to null
   */
  public logout() : void {
    localStorage.removeItem('currentUser');
    this.user = null;
    this.loggedIn = false;
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}