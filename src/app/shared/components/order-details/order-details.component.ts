import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'shared/services/order.service';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order;
  orderId: string;
  path: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.path = this.route.snapshot.url[0].path;

    this.orderService.getOrderById(this.orderId).subscribe((order) => {
      this.order = order;
    });
  }

  goBack() {
    if(this.path === "my") {
      this.router.navigate(['/my/orders']);
    }  
    else {
      this.router.navigate(['/admin/orders']);
    }
  }

}
