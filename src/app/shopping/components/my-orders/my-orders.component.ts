import {Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { OrderService } from 'shared/services/order.service';
import { OrderItem } from 'shared/models/order-item';
import { AuthService } from 'shared/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'view'];
  dataSource: MatTableDataSource<Array<OrderItem>>;
  orders;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private orderService: OrderService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user$.pipe(switchMap(user => this.orderService.getOrdersByUser(user.uid)))
      .subscribe(orders => {
        this.orders = orders;
        this.dataSource = new MatTableDataSource(this.orders);
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;      
    });
  }
}
