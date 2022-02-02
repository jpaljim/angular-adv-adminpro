import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {

  private linkTheme: any = document.querySelector('#theme');
  public links!: NodeListOf<Element>;

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/blue-dark.css';
    this.linkTheme.setAttribute('href', url);
  }

  changeTheme(color: string) {
    const url = `./assets/css/colors/${color}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    links.forEach((link: any) => {

      link.classList.remove('working');
      const btnTheme = link.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;

      const currentTheme = this.linkTheme.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        link.classList.add('working');
      }

    });
  }


}
