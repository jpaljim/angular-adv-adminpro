import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = [ 'Descargas', 'En tienda', 'Por correo' ];

  public data1 = {
    labels: this.labels1,
    datasets: [
      { 
        data: [80, 10, 20], 
        backgroundColor: ['#6857E6','#009FEE','#F02059'],
        hoverBackgroundColor: ['#6857E6','#009FEE','#F02059'],
        hoverBorderColor:['#000000','#000000','#000000']
      },
    ]
  };
  
}
