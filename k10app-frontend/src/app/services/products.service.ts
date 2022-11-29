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
    return this.http.get<StoreItem[]>(`http://${location.hostname}:3001/catalog/list`);
  }

  updateCatalogue(updatedItem: StoreItem) {

    return this.http.put<StoreItem>(`http://${location.hostname}:3001/catalog/update`, updatedItem);
  }
}
