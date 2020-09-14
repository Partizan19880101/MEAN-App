import { Subscription } from 'rxjs';
import { OrdersService } from './../shared/services/orders.service';
import { Order } from './../shared/interfaces';
import { OrderPosition } from './../shared/interfaces';
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Router, NavigationEnd} from '@angular/router'
import {MaterialInstance, MaterialService} from '../shared/classes/material.service'
import {OrderService} from './order.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  oSub: Subscription
  isRoot: boolean
  pending = false

  constructor(private router: Router,
              public order: OrderService,
              private orderService: OrdersService) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
    if(this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  open() {
    this.modal.open()
  }

  cancel() {
    this.modal.close()
  }

  submit() {
    this.pending = true

    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id
        return item
      })
    }

    this.oSub = this.orderService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен.`)
        this.order.clear()
        this.modal.close()
      },
      error => MaterialService.toast(error.error.message),
        () => {
        this.modal.close()
        this.pending = false
      }
    )  
    
  }
  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

}
