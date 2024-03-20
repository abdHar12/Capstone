export enum OrderStatus {
  IN_PROGRESS,
  COMPLETED,
  SHIPPED,
  CANCELLED,
}
export enum PaymentType {
  PAYPAL,
  CREDIT_CARD,
}
export interface Order {
  id: string;
  date: string;
  name: string;
  amount: string;
  address: string;
  orderStatus: OrderStatus;
  paymentType: PaymentType;
  userId: string;
}
