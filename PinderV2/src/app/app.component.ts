import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navigate: any;
  showButton : any=false;

  constructor(private storage: Storage, private route:Router, private toastCtrl: ToastController) {
    this.storage.create();
    this.sideMenu();
    this.storage.get('id').then((val) => {
      if (val != ""){
        this.showButton = true;
      }
    });
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
           url   : '/compte',
         },
       ];
     }

     logout(event) {    
      this.storage.remove("id").then(async resp => {
        this.route.navigate(['/']);
        let toast = this.toastCtrl.create({
          message: 'Vous etes déconnecté !',
          duration: 2000,
          position: 'top',
          color: 'danger'
        });
        (await (toast)).present();
      })
    }
}
