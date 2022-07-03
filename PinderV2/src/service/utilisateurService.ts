import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private allUser:any = [];
  private user:any = undefined;
  private dateConnection:Date = undefined;
  public connected:boolean = false;

  constructor(private http: HttpClient) {
    this.getAllUtilisateur().subscribe(resp => {
      this.allUser = resp;
    })
   }

  connection(email:string, password:string) :boolean{
    this.connected = false;
    this.allUser.forEach(user => {
      if(user.email == email && user.motDePasse == password){
        this.dateConnection = new Date();
        this.user = user;
        this.connected = true;
        return true;
      }
    })
      return this.connected
  }

  getUsersConnect() :any {
      return this.user;
  }

  deconnexion() :void {
      this.user = undefined;
      this.dateConnection = undefined;
  }

  getAllUtilisateur(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/utilisateur");
  }

  getUtilisateur(id: number): Observable<any> {
    return this.http.get<any>("http://localhost:3000/utilisateur/" + id);
  }

  create(utilisateur: any): Observable<any> {
    return this.http.post("http://localhost:3000/utilisateur/", utilisateur);
  }

  delete(utilisateur:any): Observable<any> {
    return this.http.delete("http://localhost:3000/utilisateur/"+utilisateur.id,)
  }

  update(utilisateur:any): Observable<any>{
    return this.http.put("http://localhost:3000/utilisateur/"+utilisateur.id,utilisateur);
  }
}
