import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CatalogItem} from "../../models/Catalog-models";
import {CartItem} from "../../models/Orders-models";
import {CATALOG_URL} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getCatalogue() {
    return this.http.get<CatalogItem[]>(`${CATALOG_URL}/catalog/list`);
  }

}
