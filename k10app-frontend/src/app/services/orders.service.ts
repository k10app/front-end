import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {StoreItem} from "../../models/Orders-models";
import {CartItem} from "../../models/Orders-models";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { OrderItem } from "../../models/Orders-models";

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  cart: CartItem[] = [];
  orders: OrderItem[] = [];


  constructor(private http: HttpClient) { }

  addToCart(storeItem: StoreItem, quantity: number) {
    const cartItem: CartItem = {
      storeItem,
      quantity
    }
    this.cart.push(cartItem);
    console.log(this.cart);
  }

  getCart() {
    return this.cart
  }

  deleteCartItem(index: number) {
    this.cart.splice(index, 1);
    return this.cart;
  }

  addOrder(userId: string, orderNumber: string, totalPrice: number) {
    const thisOrder: OrderItem = {
      userId,
      orderNumber,
      totalPrice,
      orderItems: this.cart
    }
    this.orders.push(thisOrder)
    this.cart = [];
    return this.cart;
  };

  getOrders() {
    return this.orders;
  }
}
