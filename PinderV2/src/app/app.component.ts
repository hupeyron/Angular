import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;

  constructor() {this.sideMenu();}

  sideMenu() {
       this.navigate =
       [
           {
           title : "Page d'acceuil",
           url   : '/home',
           },
         {
           title : 'Piner',
           url   : '#',
         },
         {
           title : 'Vos pin',
           url   : '#',
         },
         {
           title : 'Votre compte',
           url   : '#',
         },
       ];
     }
}
