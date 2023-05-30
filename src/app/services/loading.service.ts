import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../modal/login.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  urlBase = '/assets/data.json/login.json';
  constructor(private httpClient: HttpClient) {}
  private logged: boolean = false;

  getLoginJson(): Observable<Login> {
    return this.httpClient.get<Login>(this.urlBase);
  }
  getLogin(): boolean {
    return this.logged;
  }

  setLogin(booleano: boolean) {
    this.logged = booleano;
  }
}
