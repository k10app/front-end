import {CatalogItem} from "./Catalog-models";

export interface CartItem {
  storeItem: CatalogItem,
  quantity: number
}

export interface OrderItem {
  userId: string,
  orderNumber: string,
  totalPrice: number,
  orderItems: CartItem[]
}

export interface BasketAddItem {
  catalogId: string,
  quantity: number,
}

export interface BasketItem {
  id: string,
  userId: string,
  catalogId: string,
  quantity: number,
  price: number,
  name: string,
  imgurl: string

}

export interface Order {
  id: string,
  userId: string,
  orderName: string,
  userName: string,
  street: string,
  POBox: string,
  city: string,
  postcode: string,
  country: string,
  totalPrice: number,
  status: string
}

export interface OrderedItem {
  id: string,
  userId: string,
  catalogId: string
  name: string,
  quantity: string,
  price: string,
  totalPrice: number
}

export interface OrderResult {
  status: string,
  data: {
    id: number,
    totalPrice: string,
    status: string,
    items: OrderedItem[]
  }
}

export interface OrderStatus {
  id: number,
  name: string,
  status: string,
  totalPrice: string
}

export interface PaymentDetails {
  K1SA: string,
  CVC: string
}
