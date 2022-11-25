import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  basket = [
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
  totalPrice = 0

  ngOnInit() {
    this.calculateTotal();
  };

  calculateTotal() {
    if(this.basket.length < 1) {
      this.totalPrice = 0;
    } else {
      this.totalPrice = this.basket.map(i => i.price).reduce((p, c) => p + c);
    }

  }

  onDelete(index: number) {
    this.basket.splice(index, 1);
    this.calculateTotal();
  }
}
