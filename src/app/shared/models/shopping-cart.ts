import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    shopItems: ShoppingCartItem[] = [];

    constructor(public items: Array<ShoppingCartItem>) {
      for(let item of items) {
        this.shopItems.push(new ShoppingCartItem(item.product, item.quantity));
      }
    }

    getQuantity(product: Product) {  
      for(let i = 0; i < this.items.length; i++) {
        if(this.items[i].product.title === product.payload.doc.data().title) {
          var quantity = this.items[i].quantity;
        }
      }
      return quantity ? quantity : 0;
    }

    get totalPrice() {
      let sum = 0;
      for(let i = 0; i < this.shopItems.length; i++) {
        sum += this.shopItems[i].totalPrice;
      }
      return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for(let i=0; i < this.items.length; i++) {
          count += this.items[i].quantity;
        }

        return count;
    }
}