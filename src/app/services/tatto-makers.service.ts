import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TattoMaker } from '../modal/tattoMaker.model';

@Injectable({
  providedIn: 'root',
})
export class TattoMakersService {
  constructor() {}
  /*getTatuadores(): Observable<TattoMaker[]> {
    return of([
      new TattoMaker(
        'Tatuador1',
        'Descripcion del tatuador1',
        'urlImagen',
        '99887766',
        'Disponible L - J / 10hs a 12hs',

      ),
      new TattoMaker(
        'Tatuador2',
        'Descripcion del tatuador2',
        'urlImagen',
        '99113366',
        'Disponible L - J / 10hs a 12hs'
      ),
      new TattoMaker(
        'Tatuador3',
        'Descripcion del tatuador3',
        'urlImagen',
        '99113388',
        'Disponible L - J / 10hs a 12hs'
      ),
    ]);
  }*/
}
