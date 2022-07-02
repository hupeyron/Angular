import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import axios from 'axios';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

  user: any={
    "id" : 1,
    "email": "",
    "pseudo": "",
    "motDePasse": "",
    "dateNaissance": "",
    "snap": "",
    "photo": "",
    "description": "",
    "likes": [
    ],
    "pins": [
    ]
  }

  constructor(public formBuilder: FormBuilder, private route:Router) { 
  }

  submitForm() {    
    axios.post('https://angular-json-db.herokuapp.com/utilisateur', {
        email: this.user.email,
        pseudo: this.user.pseudo,
        motDePasse: this.user.motDePasse,
        snap: this.user.snap,
        dateNaissance: this.user.dateNaissance,
        photo: this.user.photo,
        likes: this.user.likes,
        pins: this.user.pins
    }).then(resp => {
        this.route.navigate(['/home']);
    }).catch(error => {
        console.log(error);
    });
  }

}
