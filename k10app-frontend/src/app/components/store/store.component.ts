import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../services/orders.service";
import {ProductsService} from "../../services/products.service";
import {StoreItem} from "../../../models/Orders-models";
import Swal from 'sweetalert2';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit{
  stockItems: StoreItem[] = [];
  isAuth = false;
  constructor(private orders: OrdersService, private productService: ProductsService, private userService: UserService) {
  }

  ngOnInit() {
    this.productService.getCatalogue().subscribe((data) => this.stockItems = data);

    if (localStorage.getItem("isAuth") !== null) {
      this.isAuth = localStorage.getItem("isAuth") == "true";
    } else {
      this.isAuth = false;
    }
  }

  onAddItem(storeItem: StoreItem, quantity: string) {
    this.orders.addToCart(storeItem, parseInt(quantity));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Item has been added!',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
