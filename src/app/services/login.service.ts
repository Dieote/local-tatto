import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { Observable, Subject } from 'rxjs';
import { Login } from '../modal/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  public generateToken(loginData: any) {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //cierra sesion y elimina token
  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtener token
  public getToken() {
    return localStorage.getItem('token');
  }

  public saveLocalUserKey(token: any, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }
  // //guardamos token y user en localStorage
  // public loginUser(token: any) {
  //   localStorage.setItem('token', token);
  //   return true;
  // }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): Login {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      const jsonData = JSON.parse(userStr);
      let usuario = new Login(
        jsonData.id,
        jsonData.email,
        jsonData.password,
        jsonData.username,
        jsonData.enabled
      );
      usuario.setAuthority(jsonData.authorities);
      return usuario;
    } else {
      this.logOut();
      return Login.createEmpty();
    }
  }

  getUserRol(): string {
    const user = this.getUser();
    if (user && user.authorities) {
      return user.authorities[0].authority;
    }
    //TODO: si quito la variable authority, no puede validar el token, cuidado.
    return 'No se encontro rol';
  }

  public getCurrentUser(): Observable<Login> {
    return this.http.get<Login>(`${baserUrl}/actual-usuario`);
  }
}
