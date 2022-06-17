import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Storage } from '@ionic/storage';
import { ToastController, NavController, IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-piner',
  templateUrl: './piner.page.html',
  styleUrls: ['./piner.page.scss'],
})
export class PinerPage {

  default : any = [];
  data : any;
  currentIndex: number;
  sliderConfig = {
    allowSlidePrev: false,
    allowSwipe: false,
    centeredSlides: true,
 
   }
  constructor(private storage: Storage, private toastCtrl: ToastController,public navCtrl: NavController) { 
    axios.get('http://localhost:3000/profil_default')
    .then(resp => {
        this.data = resp.data;
        this.data.forEach(p => {
            const profil = {
              "id" : p.id,
              "pseudo": p.pseudo,
              "dateNaissance": p.dateNaissance,
              "photo": p.photo,
              "description": p.description,
              "visible": p.visible
            }
          this.default.push(profil);
          this.currentIndex = this.default.length-1;
        });        
    })
    .catch(error => {
        console.log(error);
    });

    this.storage.get('id').then((val) => {
      console.log('ID : ', val);
    });
    
  }

   swiped(event: any, index: number) {
    console.log(this.currentIndex);
    this.default[index].visible = false;
    this.currentIndex--;
  }

  swipeleft() {
    this.default[this.currentIndex].visible = false;
    this.currentIndex--;
  }

  swiperight() {
    this.default[this.currentIndex].visible = false;
    this.currentIndex--;
  }

}
