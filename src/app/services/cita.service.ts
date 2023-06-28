import { HttpClient } from '@angular/common/http';
import { CitaModel } from './../modal/cita.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModal } from '../modal/response.modal';

@Injectable()
export class CitaService {
  citas: CitaModel[] = [];
  urlBase = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  getCitas() {
    return this.httpClient.get<CitaModel[]>(this.urlBase + '/get-list-citas');
  }

  getCitaById(id: number): Observable<CitaModel> {
    const idNum = this.urlBase + '/' + id;
    return this.httpClient.get<CitaModel>(idNum);
  }

  createCita(cita: CitaModel): Observable<ResponseModal> {
    return this.httpClient.post<ResponseModal>(
      this.urlBase + '/post-cita',
      cita
    );
  }
}
