import { Component } from '@angular/core';
import {OrdersService} from "../../services/orders.service";
import {StoreItem} from "../../../models/Orders-models";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  stockItems: StoreItem[] = [];
  constructor(private orders: OrdersService) {
  }

  ngOnInit() {
    this.orders.getCatalogue().subscribe((data) => this.stockItems = data);
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
