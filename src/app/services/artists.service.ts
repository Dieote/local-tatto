import { TattoMaker } from 'src/app/modal/tattoMaker.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ArtistsService {
  artistas: TattoMaker[] = [];
  urlBase = 'assets/data.json/authors.json'; //conecta a .json

  constructor(private httpClient: HttpClient) {}

  getArtists() {
    return this.httpClient.get<TattoMaker[]>(this.urlBase);
  }

  getArtistById(id: number): Observable<TattoMaker> {
    const numId = this.urlBase + '/' + id;
    return this.httpClient.get<TattoMaker>(numId);
  }

  createArtist(artista: TattoMaker): Observable<TattoMaker> {
    return this.httpClient.post<TattoMaker>(this.urlBase, artista);
  }

  updateArtist(artista: TattoMaker): Observable<TattoMaker> {
    const upDate = this.urlBase + '/' + artista.id;
    return this.httpClient.put<TattoMaker>(upDate, artista);
  }

  deleteArtist(id: number): Observable<TattoMaker[]> {
    const idNum = this.urlBase + '/' + id;
    return this.httpClient.delete<TattoMaker[]>(idNum);
  }
}
