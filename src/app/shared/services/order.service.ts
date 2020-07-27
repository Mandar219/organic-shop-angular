import { Injectable, Query } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from 'shared/models/order';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs: AngularFirestore, private cartService: ShoppingCartService) { }

  async placeOrder(order: Order) {
    let result = await this.afs.collection('/orders').add({...order});
    this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return this.afs.collection('/orders').snapshotChanges();
  }

  getOrdersByUser(userId: string) {
    let colRef = this.afs.collection('/orders');
    let query = colRef.ref.where("userId", "==", userId);

    return this.afs.collection('/orders', (colRef) => {
      return query;
    }).snapshotChanges();
  }

  getOrderById(orderId) {
    return this.afs.collection('/orders').doc(orderId).valueChanges();
  }
}
