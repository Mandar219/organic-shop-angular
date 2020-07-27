import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'shared/models/product';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private afs: AngularFirestore) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.afs.collection('/shopping-carts').doc(cartId).collection('/items').valueChanges()
      .pipe(map((x: ShoppingCartItem[]) => new ShoppingCart(x)));
  }

  async addToCart(product: Product) {
    this.updateCart(product, 1);
  }
  
  async removeFromCart(product: Product) {
    this.updateCart(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    localStorage.removeItem('cartId');
    this.afs.collection('shopping-carts').doc(cartId).collection('/items').snapshotChanges()
      .subscribe(result => {
        for(let i = 0; i < result.length; i++) {
          this.afs.collection('shopping-carts').doc(cartId).collection('/items').doc(result[i].payload.doc.id).delete();
        }
        this.afs.collection('shopping-carts').doc(cartId).delete();
      });
  }

  private create() {
    return this.afs.collection('/shopping-carts').add({
      dateCreated: new Date().getTime()
    })
  }

  private getItem(cartId, productId) {
    return this.afs.doc('shopping-carts/' + cartId + '/items/' + productId).get();
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;

  }

  private async updateCart(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.payload.doc.id);

    item$.pipe(take(1)).subscribe(item => {
      if(item.exists) {
        this.afs.doc('/shopping-carts/' + cartId + '/items/' + product.payload.doc.id).valueChanges().pipe(take(1))
          .subscribe((result: {quantity: number}) => {
            let quantity = result.quantity + change;
            if(quantity === 0) this.afs.doc('/shopping-carts/' + cartId + '/items/' + product.payload.doc.id).delete();
            else this.afs.doc('/shopping-carts/' + cartId + '/items/' + product.payload.doc.id + '/').update({
              quantity: quantity
            })
          });
      }
      else {
        this.afs.doc('/shopping-carts/' + cartId + '/items/' + product.payload.doc.id + '/').set({
          product: product.payload.doc.data(),
          quantity: 1
        });
      }
    });
  }
}
