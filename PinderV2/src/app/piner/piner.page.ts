import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Storage } from '@ionic/storage';
import { ToastController, NavController, IonSlides } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';


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
    this.recupererDefauts();

    this.storage.get('id').then((val) => {
      console.log('ID : ', val);
    });
    
  }

  recupererDefauts(){
    axios.get('https://angular-json-db.herokuapp.com/profil_default')
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
  }

  async swiped(event: any, index: number) {
    this.default[index].visible = false;
    this.currentIndex--;
    let toast = this.toastCtrl.create({
      message: 'swipe normal',
      duration: 2000,
      position: 'top',
      color: 'light',
    });
    (await (toast)).present();
  }

  async swipeleft() {
    if(this.testFinListe() == 1){
      return;
    }
    console.log(this.currentIndex);
    this.default[this.currentIndex].visible = false;
    this.currentIndex--;
    let toast = this.toastCtrl.create({
      message: 'next',
      duration: 2000,
      position: 'top',
      color: 'light',
      icon: "heart-dislike-outline"

    });
    (await (toast)).present();
  }

  async swiperight() {
    if(this.testFinListe() == 1){
      return;
    }
    console.log(this.currentIndex);
    this.default[this.currentIndex].visible = false;
    this.pin();
    this.currentIndex--;
    
    let toast = this.toastCtrl.create({
      message: 'pine',
      duration: 2000,
      position: 'top',
      color: 'light',
      icon: "heart-outline"
    });
    (await (toast)).present();
  }

  pin(){
    this.default.splice(this.currentIndex,1);
  }

  testFinListe(){
    if(this.currentIndex == 0){
      this.default[this.currentIndex].visible = false;
      if(this.default.length == 1){
        //chose à faire quand on à tout liké
        this.default = [];
        this.recupererDefauts();
      }
      this.currentIndex = this.default.length-1;
      this.default.forEach((element)=>{
        element.visible = true;
     });
      return 1;
    }
  }

}
