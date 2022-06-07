import { Component } from '@angular/core';
import {Router} from '@angular/router';
import axios from 'axios';
import { Storage } from '@ionic/storage';
import { FormBuilder } from '@angular/forms';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  data : any;

  user: any={
    "email": "",
    "motDePasse": "",
  }
  constructor(public formBuilder: FormBuilder, private route:Router, private storage: Storage, private toastCtrl: ToastController) {
  }

  submitForm() {
    axios.get('http://localhost:3000/utilisateur', {
      params: {
        email: this.user.email,
        motDePasse: this.user.motDePasse
      }
      }).then(resp => {
        this.data = resp.data;
        if (this.data.length == 1){
          this.data.forEach(p => {
            this.storage.set('id', p.id);
          });

          //redirect to /home
          this.route.navigate(['/home']);
        } else {
          let toast = this.toastCtrl.create({
            message: 'Email ou mot de passe incorrect',
            duration: 2000,
            position: 'top'
          });
          toast.present();
          
        }
    })
    .catch(error => {
        console.log(error);
    });
  }

}
