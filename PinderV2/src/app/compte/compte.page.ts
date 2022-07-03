import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import axios from 'axios';
import {Router} from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

import { Camera } from '@ionic-native/camera/ngx'


@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage{

  id: number;
  data: any;

  user: any={
    "email": "",
    "pseudo": "",
    "motDePasse": "",
    "dateNaissance": "",
    "snap": "",
    "photo": "",
    "description": "",
  }

  constructor(public formBuilder: FormBuilder, private route:Router, private storage: Storage, private toastCtrl: ToastController) {
    //récupérer l'id de la personne connecter
    this.storage.get('id').then((val) => {
      this.id = val;
      
      axios.get('https://angular-json-db.herokuapp.com/utilisateur', {
        params: {
          id: this.id
        }
        }).then(async resp => {
          this.data = resp.data[0];

          //set les valeurs du user pour que le form soit rempli
          this.setUser(this.data.email,this.data.pseudo, this.data.motDePasse, this.data.dateNaissance, this.data.snap, this.data.photo, this.data.description);
        })
          .catch(error => {
              console.log(error);
          });
        });
   }

  submitForm() {
    axios.put('https://angular-json-db.herokuapp.com/utilisateur/'+ this.id, {
        email: this.user.email,
        pseudo: this.user.pseudo,
        description: this.user.description,
        motDePasse: this.user.motDePasse,
        snap: this.user.snap,
        photo: this.user.photo,
        dateNaissance: this.user.dateNaissance
    }).then(async resp => {
      console.log(this.user.photo);
      //Gérer photos pour mettre dans assets/profil
      
      let toast = this.toastCtrl.create({
        message: 'Vos informations ont étés modifiées',
        duration: 2000,
        position: 'top',
        color: 'light'
      });
      (await toast).present();
    }).catch(error => {
        console.log(error);
    });
  }

  setUser(email, pseudo, motDePasse, dateNaissance, snap, photo, description){
    this.user.email = email;
    this.user.pseudo = pseudo;
    this.user.motDePasse = motDePasse;
    this.user.dateNaissance = dateNaissance;
    this.user.snap = snap;
    this.user.photo = photo;
    this.user.description = description;
  }

}
