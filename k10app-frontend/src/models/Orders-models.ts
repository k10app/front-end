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
  orderName: string,
  status: string,
  totalPrice: number
}

export interface OrderResult {
  id: string,
  orderName: string,
  items: OrderedItem[]
}
