import { Payment } from "../types";

export class Order {
  protected address: string;
  protected phone: string;
  protected email: string;
  protected payment: Payment;

  constructor() {
      this.address = '';
      this.phone = '';
      this.email = '';
      this.payment = 'онлайн';
    };

  setAddress(address: string) {
    this.address = address;
  }

  setPhone(phone: string) {
    this.phone = phone;
  }

  setEmail(email: string) {
    this.email = email;
  }

  setPayment(payment: Payment) {
    this.payment = payment;
  }
}