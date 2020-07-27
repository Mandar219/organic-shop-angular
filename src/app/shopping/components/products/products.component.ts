import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Array<Product>;
  filteredProducts: Array<Product>;
  category: string;
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute) {
      productService.getAll()
        .then(result => {
          this.products = result

          route.queryParamMap.subscribe(params => {
            this.category = params.get('category');
    
            if(!this.products) return [];
            this.filteredProducts = (this.category) ? 
              this.products.filter(p => p.payload.doc.data().category === this.category) :
              this.products;
          });
        });

  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
      .subscribe(cart => {
        this.cart = cart;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
