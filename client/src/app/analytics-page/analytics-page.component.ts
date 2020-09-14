import { Subscription, from } from 'rxjs';
import { AnalyticsService } from './../shared/services/analytics.service';
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsPage } from '../shared/interfaces';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.css']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('order') orderRef: ElementRef

  average: number
  pending = true
  aSUB: Subscription


  constructor(private service: AnalyticsService) { }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    }
    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    }

    this.aSUB = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average

      gainConfig.labels = data.chart.map(item => item.label)
      gainConfig.data = data.chart.map(item => item.gain)

      orderConfig.labels = data.chart.map(item => item.label)
      orderConfig.data = data.chart.map(item => item.order)

      // Для тестирования графика
      gainConfig.labels.push('12.09.2020')
      gainConfig.data.push('149')
      gainConfig.labels.push('13.09.2020')
      gainConfig.data.push('130')
      // temp
      // temp
      orderConfig.labels.push('12.09.2020')
      orderConfig.data.push('10')
      orderConfig.labels.push('13.09.2020')
      orderConfig.data.push('2')
      // Для тестирования графика


      const gainCtx = this.gainRef.nativeElement.getContext('2d')
      const orderCtx = this.orderRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = '300px'
      orderCtx.canvas.height = '300px'

      new Chart(gainCtx, createCharConfig(gainConfig))
      new Chart(orderCtx, createCharConfig(orderConfig))
      this.pending = false
    })
  }
  ngOnDestroy(){
    if (this.aSUB) {
      this.aSUB.unsubscribe()
    }
    
  }

}
function createCharConfig({labels, data, label, color}) {
  return {
    type: 'line',
    otions: {
      responsive: true
    },
    data: {
      labels, 
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}