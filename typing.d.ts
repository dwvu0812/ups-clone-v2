export type Customer = {
  email: string;
  name: string;
};

export type CustomerList = {
  name: ID;
  value: Customer;
};
export interface TrackingItem {
  customer: Customer;
  customer_id: ID;
  items: Item[];
}
export interface Customer {
  name: string;
  email: string;
}
export interface Item {
  item_id: ID;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  Address: string;
  City: string;
  Lat: number;
  Lng: number;
  carrier: string;
  createdAt: string;
  shippingCost: number;
  trackingId: string;
  trackingItems: TrackingItem;
}

export interface OrderResponse {
  value: Order;
};

export type CustomerResponse = {
  name: ID;
  value: Customer;
};
