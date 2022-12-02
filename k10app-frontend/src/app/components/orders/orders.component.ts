import {Component, OnInit} from '@angular/core';
import {OrderedItem, OrderItem, OrderStatus} from "../../../models/Orders-models";
import { OrdersService } from "../../services/orders.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: OrderStatus[] = []

    constructor(private ordersService: OrdersService) {
    }

    ngOnInit() {
      this.ordersService.getUserOrders().subscribe({
        next: (result) => {
          this.orders = result
        },
        error: (error) => {
          Swal.fire({
            icon: "error",
            title: "Error getting orders!",
            text: error
          })
        }
      })
    }
}
