import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { UserAuth } from "../../models/Auth-models";
import {Observable} from "rxjs";
import {baseUrl} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/register`, data);
  }
}
