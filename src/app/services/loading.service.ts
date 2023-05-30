import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }
  logged: boolean = false;

  setLogin(email: string, password: string){
    if(email == 'admin' && password == 'admin'){
      this.logged = true;
    }else {
      this.logged = false;
    }
  }
  getLogin(): boolean{
  return this.logged;
  }
}
