import { TattoMaker } from 'src/app/modal/tattoMaker.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseModal } from '../modal/response.modal';
import baserUrl from './helper';

@Injectable()
export class ArtistsService {
  artistas: TattoMaker[] = [];

  urlBase = baserUrl;

  constructor(private httpClient: HttpClient) {}

  getArtists() {
    return this.httpClient.get<TattoMaker[]>(
      this.urlBase + '/get-list-artists'
    );
  }

  getArtistById(id: number): Observable<TattoMaker> {
    const numId = this.urlBase + '/' + id;
    return this.httpClient.get<TattoMaker>(numId);
  }

  createArtist(artista: TattoMaker): Observable<ResponseModal> {
    return this.httpClient.post<ResponseModal>(
      this.urlBase + '/post-artist',
      artista
    );
  }
  uploadImageArtist(artistId: number, file: File): Observable<ResponseModal> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<ResponseModal>(
      `${this.urlBase}/post-image-artist/${artistId}`,
      formData
    );
  }

  updateArtist(artista: TattoMaker): Observable<ResponseModal> {
    const upDate = this.urlBase + '/update-artist/';
    return this.httpClient.put<ResponseModal>(upDate, artista);
  }

  deleteArtist(artistId: number): Observable<ResponseModal> {
    const idArt = this.urlBase + '/delete-artist/' + artistId;
    return this.httpClient.delete<ResponseModal>(idArt);
  }
}
