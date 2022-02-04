import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription = new Subscription;

  constructor() {
    // un pipe es realmente como un alguna extensión o algun molde que cambie la forma en la que sale el agua de una manguera. Es una forma de transformar la información que fluye a través del observable, en este caso también podemos reintentar hacerlo
    // this.retornaObservable().pipe(
    //   retry(4)
    //   ).subscribe({
    //   next: (valor) => console.log('Sub', valor),
    //   error: (error) => console.warn('Error', error),
    //   complete: () => console.info('Completado'),
    // });

    // se puede poner el next como arriba, pero si lo pongo de esa manera es lo mismo, ya que todos los valores que retorne el next se lo pasa directamente al console.log
    this.intervalSubs = this.retornaIntervalo()
    .subscribe({
      next: console.log
    });
  }

  retornaIntervalo(): Observable<number> {
    // el take el número de veces que queremos emitir
    // el map me sirve para transformar la información que recibe el observable y mutarla de la manera que yo necesite
    // importa mucho el orden en el que ponemos estos operadores, si ponemos el take al final, tiene otro comportamiento
    return interval(100).pipe(
      // take(10),
      map( valor => {
        return valor+1;
      }),
      filter( valor => ( valor % 2 === 0 ) ? true : false),
    );
  }

  retornaObservable(): Observable<number> {
    // el $ no sirve para nada, pero es un standard
    let i = -1;
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('i es 2');
        }
      }, 1000);
    });
  }


  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
}
