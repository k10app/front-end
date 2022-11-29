import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {BASE_URL} from "../../environments/environments";
import { Subject } from 'rxjs';
import {LoginData, LoginResult, UserRegister, CheckAuth} from "../../models/Auth-models";
import {HttpHeaders} from "@angular/common/http";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  isAuth = false;
  sendAuth = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  getLoginResponse(data: LoginData): Observable<HttpResponse<LoginResult>> {
    return this.http.post<LoginResult>(`${BASE_URL}/user/login`, data, {observe: 'response'})
  };

  getRegisterResponse(data: UserRegister): Observable<HttpResponse<LoginResult>> {
    return this.http.post<LoginResult>(`${BASE_URL}/user/register`, data, {observe: 'response'})
  };

  getVerifyAuth(jwt: string): Observable<HttpResponse<CheckAuth>> {
    const headers = new HttpHeaders().set("Authorization", jwt);
    return this.http.get<CheckAuth>(`${BASE_URL}/user/verify`, {"headers": headers, observe: "response"})
  }

  sendAlert(alertType: string, title: string, message: string) {
    if (alertType == 'success') {
      Swal.fire({
        icon: alertType,
        title: title,
        text: message
      })
    };

    if (alertType == 'error') {
      Swal.fire({
        icon: alertType,
        title: title,
        text: message
      })
    }

  }

  deleteJwt() {
    if(localStorage.getItem("jwt") !== null) {
      localStorage.removeItem("jwt")
    };
  }

  login(data: LoginData): boolean {

    this.getLoginResponse(data).subscribe(
      (response) => {
          this.isAuth = true;
          let bearerString = `Bearer ${response.body?.jwt}`
          localStorage.setItem("jwt", bearerString);
      },
      (error) => {
        this.isAuth = false;
        this.deleteJwt();
        this.sendAlert("error", "Login Error", error)

      })
    this.sendAuth.next(this.isAuth);
    return this.isAuth
  }

  register(data: UserRegister): boolean {

    this.getRegisterResponse(data).subscribe(
      (response) => {
        this.isAuth = true;
        let bearerString = `Bearer ${response.body?.jwt}`
        localStorage.setItem("jwt", bearerString);
        this.sendAuth.next(this.isAuth);
      },
      (error) => {
        this.isAuth = false;
        this.deleteJwt();
        this.sendAlert("error", "Login Error", error)
      })

    this.sendAuth.next(this.isAuth);
    return this.isAuth
  }

  getAuth() {
    if(localStorage.getItem('jwt') !== null){
      const jwt = localStorage.getItem("jwt") as string;
      this.getVerifyAuth(jwt).subscribe(
        (resp) => {
          this.isAuth = true;
        },
        (error) => {
          this.isAuth = false;
          this.sendAlert("error", "Login Error", error)
        })
    }
    return this.isAuth;
  }

}
