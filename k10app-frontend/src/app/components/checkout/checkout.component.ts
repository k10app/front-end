import { Component } from '@angular/core';
import { CartItem } from "../../../models/Orders-models";
import { OrdersService } from "../../services/orders.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cart: CartItem[] = [
  ]
  totalPrice = 0;

  constructor(private orders: OrdersService) {
  }


  ngOnInit() {
    this.cart = this.orders.getCart();
    this.calculateTotal();
  };

  calculateTotal() {
    this.totalPrice = 0;
    if(this.cart.length > 0) {
      this.cart.forEach((i) => {
        this.totalPrice += i.quantity * i.storeItem.price;
      })
  }};

  placeOrder() {
    this.orders.addOrder("123", "abc", this.totalPrice);
    this.cart = [];
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
        this.cart = this.orders.deleteCartItem(index);
        this.calculateTotal();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
}
