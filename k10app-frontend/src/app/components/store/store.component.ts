import { Component } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  dummyData = [
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
