import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  createProduct(product) {
    this.db.collection('/products').add({
      title: product.title,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl
    });
  }

  getAll() {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('/products').snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
    });
  }

  getProduct(productId) {
    return this.db.collection('/products').doc(productId).valueChanges();
  }

  updateProduct(productId, product) {
    return this.db.collection('/products').doc(productId).set(product);
  }

  deleteProduct(productId) {
    return this.db.collection('/products').doc(productId).delete();
  }
}
