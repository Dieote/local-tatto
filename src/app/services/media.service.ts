import { Injectable } from '@angular/core';
import baserUrl from './helper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageModal } from '../modal/image.model';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  urlBase = baserUrl;

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<ImageModal> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ImageModal>(`${this.urlBase}/media/upload`, formData);
  }

  getImages(): Observable<ImageModal[]> {
    return this.http.get<ImageModal[]>(`${this.urlBase}/media/images`);
  }

  getImageByArtist(artistId: number): Observable<string> {
    return this.http.get<string>(
      `${this.urlBase}/media/imagesByArtist/${artistId}`
    );
  }

  getImageByName(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders().set('Accept', 'image/*');
    return this.http.get(`${this.urlBase}/media/show/${fileName}`, {
      responseType: 'blob',
      headers: headers,
    });
  }

  deleteImage(uuid: string): Observable<any> {
    return this.http.delete<void>(`${this.urlBase}/media/delete-image/${uuid}`);
  }
}
