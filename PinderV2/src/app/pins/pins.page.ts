import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Storage } from '@ionic/storage';
import { ToastController, NavController, IonSlides } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.page.html',
  styleUrls: ['./pins.page.scss'],
})
export class PinsPage implements OnInit {

  id: number;
  data : any;
  pins: any=[]

  constructor(private storage: Storage, private toastCtrl: ToastController,public navCtrl: NavController) {
     this.chargerpins();
     console.log("test");
     console.log(this.pins);
   }

  ngOnInit() {
  }

  chargerpins(){
    this.storage.get('id').then((val) => {
      this.id = val;
      
      axios.get('https://angular-json-db.herokuapp.com/utilisateur', {
        params: {
          id: this.id
        }
        }).then(async resp => {
          this.data = resp.data[0];

          console.log("test2");
          console.log(this.data.pins)
            for (var item in this.data.pins) {
              console.log(item);
              axios.get('https://angular-json-db.herokuapp.com/profil_default', {
        params: {
          id: item
        }
        }).then(async resp => {
          this.data = resp.data[0];

          console.log("test4");
          console.log(this.data)
          const pin = {
            "nom" : this.data.pseudo,
            "snap": this.data.snap,
          }
          this.pins.push(pin)
          
        })
          .catch(error => {
              console.log(error);
          });
            }
          
        })
          .catch(error => {
              console.log(error);
          });
        });

    this.storage.get('id').then((val) => {
      console.log('ID : ', val);
    });
  }

  chercheruser(id){
      
      
  }

}
