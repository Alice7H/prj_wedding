export interface Order {
  id?: string;
  dateOrdered: Date;
  status: string;
  shippingId: string;
  userId: string;
  address: string;
  total: number;
  payment?: Payment
}

export interface Payment {
  id?: string;
  paymentType: string;
  paymentDate: Date;
  paymentDetails: string;
  paid: boolean;
  total: number;
  orderId: string;
}

export interface Shipping {
  id?: string;
  shippingDate: Date;
  trackShippingValue: string;
  shippingMethod: string;
  shippingValue: number;
  shippingZipCode: string;
  shippingRegion: string;
  order?: Order;
}

export interface Product_Order {
  id?: string;
  quantity: number;
  unityPrice: number;
  subtotal: number;
  orderId: string;
  prodId: string;
}