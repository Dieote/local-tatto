import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TattoMaker } from '../modal/tattoMaker.model';

@Injectable()
export class ArtistsService {
  constructor(private httpClient: HttpClient) {}

  urlBase = 'assets/data.json/authors.json'; //conecta a .json

  verArtistas() {
    return this.httpClient.get<TattoMaker[]>(this.urlBase);
  }

  // crearARtista(artita:tatomaker)
}
