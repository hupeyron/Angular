import { Component } from '@angular/core';
import axios from 'axios';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  default : any = [];
  data : any;

  constructor(private storage: Storage) {
    axios.get('http://localhost:3000/profil_default')
    .then(resp => {
        this.data = resp.data;
        this.data.forEach(p => {
            const profil = {
              "id" : p.id,
              "pseudo": p.pseudo,
              "dateNaissance": p.dateNaissance,
              "photo": p.photo,
              "description": p.description
            }
          this.default.push(profil);
        });        
    })
    .catch(error => {
        console.log(error);
    });

    this.storage.get('id').then((val) => {
      console.log('ID : ', val);
    });
    
  }
  
}
