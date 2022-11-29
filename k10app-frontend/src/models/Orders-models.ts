export interface StoreItem {
  _id: number,
  name: string,
  price: number,
  summary: string,
  description: string,
  imgurl: string,
  stock: number,
}

export interface CartItem {
  storeItem: StoreItem,
  quantity: number
}

export interface OrderItem {
  userId: string,
  orderNumber: string,
  totalPrice: number,
  orderItems: CartItem[]
}
