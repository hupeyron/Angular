import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ionicForm: FormGroup;
  constructor(public formBuilder: FormBuilder) {

  }

  ngOnInit() {
  }

  submitForm() {
    console.log(this.ionicForm.value)
  }

}
