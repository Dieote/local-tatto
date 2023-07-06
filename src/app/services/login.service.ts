import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public generateToken(loginData: any) {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  //guardamos token en localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);
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

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logOut();
      return null;
    }
  }

  getUserRol(): string {
    const user = this.getUser();
    if (user && user.authorities) {
      return user.authorities[0];
    }
    return 'No se encontro rol';
  }

  public getCurrentUser() {
    return this.http.get(`${baserUrl}/actual-usuario`);
  }
}
