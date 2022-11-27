import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {StoreItem} from "../../models/Orders-models";
import {CartItem} from "../../models/Orders-models";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getCatalogue() {
    return this.http.get<StoreItem[]>("http://localhost:3001/catalog/list");
  }

  updateCatalogue(updatedItems: CartItem[]) {

    return this.http.put<CartItem[]>("http://localhost:3001/catalog/updateItems", updatedItems);
  }
}
