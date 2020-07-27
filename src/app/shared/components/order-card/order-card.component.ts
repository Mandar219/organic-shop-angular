import { Component, OnInit, Input } from '@angular/core';

interface Item {
  datePlaced: number,
  items: Array<{
    totalPrice: number;
  }>
  shipping: {
    name: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    pincode: string
  }
}

@Component({
  selector: 'order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input('order') order: Item;

  constructor() { }

  ngOnInit(): void {
  }

  total() {
    let totalPrice = 0
    for(let i = 0; i < this.order.items.length; i++) {
      totalPrice += this.order.items[i].totalPrice;
    }
    return totalPrice;
  }

}
