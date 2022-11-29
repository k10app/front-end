import { Component } from '@angular/core';
import { CartItem } from "../../../models/Orders-models";
import { OrdersService } from "../../services/orders.service";
import Swal from 'sweetalert2';
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cart: CartItem[] = [
  ]
  totalPrice = 0;

  constructor(private orders: OrdersService, private productsService: ProductsService) {
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
    const cart = this.orders.getCart();
    // update the stock in each of the cart items
    this.cart.forEach((i) => {
      i.storeItem.stock = i.storeItem.stock - i.quantity
    });
    this.cart.forEach((i) => {
      this.productsService.updateCatalogue(i.storeItem).subscribe(data => console.log(data));
    })
    this.orders.addOrder("123", "abc", this.totalPrice);

    Swal.fire({
      title: 'Success!',
      text: 'Your Order has been placed!',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
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
          'The item was deleted.',
          'success'
        )
      }
    })
  }
}
