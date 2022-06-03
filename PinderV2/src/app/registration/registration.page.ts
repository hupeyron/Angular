import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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
    "likes": [
      "second@test.fr"
    ],
    "pins": [
      "second@test.fr"
    ]
  }

  constructor(public formBuilder: FormBuilder) { 
  }

  submitForm() {    
    console.log('email de l\'utilisateur :', this.user.email);
  }

}
