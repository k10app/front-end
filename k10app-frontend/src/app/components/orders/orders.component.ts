import {Component, OnInit} from '@angular/core';
import { OrderItem } from "../../../models/Orders-models";
import { OrdersService } from "../../services/orders.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: OrderItem[] = [
      {
        userId: "abcd",
        orderNumber: "1234",
        totalPrice: 13.33,
        orderItems: [
          {
            quantity: 1,
            storeItem: {
              _id: 1,
              name: "banana",
              price: 1.99,
              summary: "",
              description: "hello",
              imgurl: "",
              stock: 1
            }
          }
        ]
      }
    ]

    constructor(private ordersService: OrdersService) {
    }

    ngOnInit() {
      this.orders = this.ordersService.getOrders()
    }
}
