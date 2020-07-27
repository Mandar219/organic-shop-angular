import { Component, ViewChild, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['title', 'price', 'edit'];

  products: Array<Product>;
  //filteredProducts: Array<Product>;

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    this.productService.getAll()
      .then(products => {
        this.products = products;

        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      });
  }

  // filter(query: string) {
  //   this.filteredProducts = (query) ?
  //    this.products.filter(product => product.title.toLowerCase().includes(query.toLowerCase())) :
  //    this.products;
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

}
