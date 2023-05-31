import { Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss'],
})
export class ArtistFormComponent {
  // constructor(private route:Routes){}
  //crear el formulario con los valores de tatoomaker, MENOS el id
  //---cuando vas a crear un tatuador---
  // tener un boton que diga save tatuador y que tenga un (click)="saveTatoMaker()"
  // saveTatoMaker(){
  //   this.artistSErvice.createArtist(taduador)
  // }
  //---cuando vas a editar
  //crear metodo updateTatoMaker o delete... igual que saveTatoMaker
  // asd(){
  // this.route.getParams(params)
}
