import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent {

  @Input() tittle = "Sin título";
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: [ 'Label1', 'Label2', 'Label3' ],
    datasets: [
      { 
        data: [350, 450, 100], 
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
        hoverBackgroundColor: ['#6857E6','#009FEE','#F02059'],
        hoverBorderColor:['#000000','#000000','#000000']
      },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
