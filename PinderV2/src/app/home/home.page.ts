import { Component } from '@angular/core';
import axios from 'axios';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  default : any = [];
  data : any;

  constructor() {
    axios.get('http://localhost:3000/profil_default')
    .then(resp => {
        this.data = resp.data;
        this.data.forEach(p => {
            const profil = {
              "id" : p.id,
              "pseudo": p.pseudo,
              "dateNaissance": p.dateNaissance,
              "photo": p.photo,
            }
          this.default.push(profil);
        });
        console.log(this.default);
        
    })
    .catch(error => {
        console.log(error);
    });
  }
  
}
