import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  public auth2: any;

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': token,
        },
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        }),
        map((resp) => true),
        //el of es para retornar un nuevo observable en base al valor que se le ponga, para no romper el ciclo
        catchError((error) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return (
      this.http
        .post(`${base_url}/usuarios`, formData)
        // el pipe tap es para añadir un efecto segundario a un observable
        .pipe(
          tap((resp: any) => {
            localStorage.setItem('token', resp.token);
          })
        )
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  googleInit() {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '434112024948-13ot8f38fvg8lrbk26sr0jp1bt9lj8uo.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
