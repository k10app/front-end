import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {USERS_URL} from "../../environments/environments";
import { Subject } from 'rxjs';
import {LoginData, LoginResult, UserRegister, CheckAuth} from "../../models/Auth-models";
import {HttpHeaders} from "@angular/common/http";
import Swal from 'sweetalert2';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  isAuth = false;
  sendAuth = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  login(data: LoginData): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${USERS_URL}/user/login`, data).pipe(
      catchError(this.handleError)
    )
  }

  register(data: UserRegister): Observable<LoginResult> {
    return this.http.post<LoginResult>(`${USERS_URL}/user/register`, data).pipe(
      catchError(this.handleError)
    )
  }

  getAuth(jwt: string): Observable<CheckAuth> {
    const headers = new HttpHeaders().set("Authorization", jwt);
    return this.http.get<CheckAuth>(`${USERS_URL}/user/verify`, {"headers": headers }).pipe(
      catchError(this.handleError)
    )
  }

  logout() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("isAuth");
    this.sendAuth.next(false);
  }

}
