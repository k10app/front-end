import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../services/orders.service";
import {CatalogItem} from "../../../models/Catalog-models";
import {ProductsService} from "../../services/products.service";
import Swal from 'sweetalert2';
import {UserService} from "../../services/user.service";
import {BasketAddItem} from "../../../models/Orders-models";

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit{
  stockItems: CatalogItem[] = [];
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

  onAddItem(storeItem: CatalogItem, quantity: string) {
    const basketAddItem: BasketAddItem = {
      catalogId: storeItem._id,
      quantity: parseInt(quantity)
    }

    this.orders.addToBasket(basketAddItem).subscribe({
      next: (res) => {
        if(res.success == "ok") {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Item has been added!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          title: "Order Add Error",
          text: error
        })
      }
    })

  }
}
