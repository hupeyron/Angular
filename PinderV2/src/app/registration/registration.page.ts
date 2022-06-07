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
      "second@test.fr"
    ],
    "pins": [
      "second@test.fr"
    ]
  }

  constructor(public formBuilder: FormBuilder, private route:Router) { 
  }

  submitForm() {    
    axios.post('http://localhost:3000/utilisateur', {
        email: this.user.email,
        pseudo: this.user.pseudo,
        motDePasse: this.user.motDePasse,
        snap: this.user.snap,
        dateNaissance: this.user.dateNaissance,
        photo: "",
        likes: [],
        pins: []
    }).then(resp => {
        this.route.navigate(['/home']);
    }).catch(error => {
        console.log(error);
    });
  }

}
