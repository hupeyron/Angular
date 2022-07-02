import { Component, ViewChild } from '@angular/core';
import axios from 'axios';
import { Storage } from '@ionic/storage';
import { ToastController, NavController, IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  default : any = [];
  data : any;

  sliderConfig = {
    allowSlidePrev: false,
    allowSwipe: false,
    centeredSlides: true,
 
   }

  constructor(private storage: Storage, private toastCtrl: ToastController,public navCtrl: NavController) {
    axios.get('https://angular-json-db.herokuapp.com/profil_default')
    .then(resp => {
        this.data = resp.data;
        this.data.forEach(p => {
            const profil = {
              "id" : p.id,
              "pseudo": p.pseudo,
              "dateNaissance": p.dateNaissance,
              "photo": p.photo,
              "description": p.description
            }
          this.default.push(profil);
        });        
    })
    .catch(error => {
        console.log(error);
    });

    this.storage.get('id').then((val) => {
      console.log('ID : ', val);
    });
  }

  async piner(slides){
    let toast = this.toastCtrl.create({
      message: 'je pine',
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    (await (toast)).present();
    slides.slideNext(); 
   }

   async nexter(slides){
    let toast = this.toastCtrl.create({
      message: 'je next',
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    (await (toast)).present();
    slides.slideNext(); 
   }
  
}
