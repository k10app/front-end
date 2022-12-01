import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {BasketAddItem, BasketItem, OrderedItem, OrderResult} from "../../models/Orders-models";
import {CatalogItem} from "../../models/Catalog-models";
import {CartItem} from "../../models/Orders-models";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { OrderItem } from "../../models/Orders-models";
import {ORDERS_URL} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  constructor(private http: HttpClient) { }

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

  createHeaders(): HttpHeaders {
    const jwt = localStorage.getItem("jwt") as string;
    return new HttpHeaders().set("Authorization", jwt);
  }

  // basket stuff

  // get basket
  getBasket(): Observable<BasketItem[]> {
    const headers = this.createHeaders();
    return this.http.get<BasketItem[]>(`${ORDERS_URL}/order/basket/list`, {"headers": headers}).pipe(
      catchError(this.handleError)
    )
  }

  addToBasket(basketItem: BasketAddItem) {
    const headers = this.createHeaders();
    return this.http.post<{success: string}>(`${ORDERS_URL}/order/basket/add`, basketItem, {"headers": headers}).pipe(
      catchError(this.handleError)
    )
  }

  deleteBasket(id: string) {
    const headers = this.createHeaders();
    return this.http.delete<{status: string}>(`${ORDERS_URL}/order/basket/${id}`, {"headers": headers}).pipe(
      catchError(this.handleError)
    )
  }

  // Orders section

  // Get orders for user
  getUserOrders(): Observable<OrderedItem[]> {
    const headers = this.createHeaders();
    return this.http.get<OrderedItem[]>(`${ORDERS_URL}/order/main/list`, {"headers": headers}).pipe(
      catchError(this.handleError)
    )
  }

  createOrder() {
    const headers = this.createHeaders();
    return this.http.post<OrderResult>(`${ORDERS_URL}/order/main/create`, {}, {"headers": headers}).pipe(
      catchError(this.handleError)
    )
  }

}
