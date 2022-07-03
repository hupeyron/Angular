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

  id: number;

  user: any={
    "email": "",
    "pseudo": "",
    "motDePasse": "",
    "dateNaissance": "",
    "snap": "",
    "photo": "",
    "description": "",
    "likes": [],
    "pins": [],
  }

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
      this.id = val;
      
      axios.get('https://angular-json-db.herokuapp.com/utilisateur', {
        params: {
          id: this.id
        }
        }).then(async resp => {
          this.data = resp.data[0];

          //set les valeurs du user pour que le form soit rempli
          this.setUser(this.data.likes,this.data.pins, this.data.email,this.data.pseudo, this.data.motDePasse, this.data.dateNaissance, this.data.snap, this.data.photo, this.data.description);
        })
          .catch(error => {
              console.log(error);
          });
        });

    this.storage.get('id').then((val) => {
      console.log('ID : ', val);
    });
    
  }

  setUser(likes, pins, email, pseudo, motDePasse, dateNaissance, snap, photo, description){
    this.user.email = email;
    this.user.pseudo = pseudo;
    this.user.motDePasse = motDePasse;
    this.user.dateNaissance = dateNaissance;
    this.user.snap = snap;
    this.user.photo = photo;
    this.user.description = description;
    this.user.likes = likes;
    this.user.pins = pins;
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
              "visible": p.visible,
              "likes" : p.likes,
              "pins": p.pins
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
    this.pin(this.id);
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

  pin(userid){
    this.user.likes.push(this.default[this.currentIndex].id);
    var userpins = this.user.pins;
    var defaultpins = this.default[this.currentIndex].pins;
    var defaultid = this.default[this.currentIndex].id;
    if(this.default[this.currentIndex].pins != null){
      this.default[this.currentIndex].likes.forEach(function(item){
        console.log(item);
        if(item == userid){
          userpins.push(defaultid);
          defaultpins.push(userid);
        }
      });
    }
    console.log(defaultpins);
    console.log(userpins);
    this.user.pins = userpins;
    this.default[this.currentIndex].pins = defaultpins;
    this.sauvegarderPin();
    this.default.splice(this.currentIndex,1);
  }

  sauvegarderPin() {

    //sauvegarder pour l'utilisateur connecté
    axios.put('https://angular-json-db.herokuapp.com/utilisateur/'+ this.id, {
      email: this.user.email,
      pseudo: this.user.pseudo,
      description: this.user.description,
      motDePasse: this.user.motDePasse,
      snap: this.user.snap,
      photo: this.user.photo,
      dateNaissance: this.user.dateNaissance,
      pins:this.user.pins,
      likes: this.user.likes,
      visible: this.default[this.currentIndex].visible,
    }).then(async resp => {
      console.log(this.user.photo);
    }).catch(error => {
        console.log(error);
    });

    //sauvegarde pour l'utilisateur liké
    axios.put('https://angular-json-db.herokuapp.com/profil_default/'+ this.default[this.currentIndex].id, {
      pseudo: this.default[this.currentIndex].pseudo,
      dateNaissance: this.default[this.currentIndex].dateNaissance,
      photo: this.default[this.currentIndex].photo,
      description: this.default[this.currentIndex].description,
      visible: this.default[this.currentIndex].visible,
      snap: this.default[this.currentIndex].snap,
      pins:this.default[this.currentIndex].pins,
      likes: this.default[this.currentIndex].likes,
    }).then(async resp => {
      console.log(this.user.photo);
    }).catch(error => {
        console.log(error);
    });
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
