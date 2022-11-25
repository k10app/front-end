import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders = [
    {
      orderNum: 1,
      totalPrice: 32.97,
      orderItems: [
        {
          name: "Coffee Cup",
          description: "A really nice cup of coffee can be had with this.",
          image: "",
          price: 10.99,
        },
        {
          name: "K10 T-Shirt",
          description: "The best t-shirt ever!",
          image: "",
          price: 10.99,
        },
        {
          name: "K10 Baseball bat",
          description: "Yes, even a baseball bat!",
          image: "",
          price: 10.99,
        }
      ]
    },
    {
      orderNum: 2,
      totalPrice: 32.97,
      orderItems: [
        {
          name: "Coffee Cup",
          description: "A really nice cup of coffee can be had with this.",
          image: "",
          price: 10.99,
        },
        {
          name: "K10 T-Shirt",
          description: "The best t-shirt ever!",
          image: "",
          price: 10.99,
        },
        {
          name: "K10 Baseball bat",
          description: "Yes, even a baseball bat!",
          image: "",
          price: 10.99,
        }
      ]
    }
  ]
}
