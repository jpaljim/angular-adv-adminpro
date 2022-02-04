import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getUsuarios().then((usuarios) => {
      console.log(usuarios);
    });
    // const promesa = new Promise((resolve, reject) => {
    //   if(false){
    //     resolve('resolve correcto');
    //   } else {
    //     reject('Algo salió mal');
    //   }
    // });

    // promesa.then( (resp) => {
    //   console.log(resp);
    // })
    // .catch(err => {
    //   console.log('Error en la promesa',err);
    // });

    // console.log('fin del init');
  }

  getUsuarios() {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });
  }
}
