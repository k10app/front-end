import {Component, OnInit} from '@angular/core';
import {BasketItem} from "../../../models/Orders-models";
import { OrdersService } from "../../services/orders.service";
import Swal from 'sweetalert2';
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  basket: BasketItem[] = [
  ]
  totalPrice = 0;

  constructor(private orders: OrdersService, private productsService: ProductsService) {
  }


  ngOnInit() {
    this.getBasket();
  };

  calculateTotal() {
    this.totalPrice = 0;
    if(this.basket.length > 0) {
      this.basket.forEach((i) => {
        this.totalPrice += i.quantity * i.price;
      })
    }};

  getBasket() {
    this.orders.getBasket().subscribe({
      next: (res) => {
        this.basket = res;
        this.calculateTotal();
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Error getting basket",
          text: error
        })
      }
    });
  }

  placeOrder() {

    this.orders.createOrder().subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Success!',
          text: 'Your Order has been placed!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Order Error",
          text: error
        })
      }
    });

    this.basket = [];
  }

  onDelete(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const id = this.basket[index].id;
        this.orders.deleteBasket(id).subscribe({
          next: (result) => {
            if(result.status == "ok") {

              Swal.fire(
                'Deleted!',
                'The item was deleted.',
                'success'
              )
            }
          },
          error: (error) => {
            Swal.fire({
              icon: "error",
              title: "Error deleting item",
              text: error
            })
          }
        })
        this.getBasket();
      }
    })
  }
}
