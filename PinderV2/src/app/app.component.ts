import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;

  constructor(private storage: Storage) {this.sideMenu();}

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

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
