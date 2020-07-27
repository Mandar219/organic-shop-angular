import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

interface ProductF {
  
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories;
  product = {
    title: "",
    price: 0,
    category: "",
    imageUrl: ""
  };
  id;

  constructor(
    private categoryService: CategoryService, 
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router) {
    categoryService.getCategories()
      .then(result => {
        this.categories = result;
      });

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.getProduct(this.id).pipe(take(1)).subscribe((product: {title: string, price: number, category: string, imageUrl: string}) => {
      this.product = product
    });
  }

  save(product) {
    if(this.id) this.productService.updateProduct(this.id, product);
    else this.productService.createProduct(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm("Are you sure you want to delete this product?")) return;

    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

}
