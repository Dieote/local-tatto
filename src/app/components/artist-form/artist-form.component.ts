import { TattoMakersService } from './../../services/tatto-makers.service';
import { ArtistsService } from './../../services/artists.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TattoMaker } from 'src/app/modal/tattoMaker.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss'],
})
export class ArtistFormComponent implements OnInit {
  artistas: TattoMaker[] = [];

  idAuthor: number = 0;
  constructor(
    private artistsService: ArtistsService,
    private route: ActivatedRoute
  ) {}

  form = new FormGroup({
    idArtistForm: new FormControl(''),
    nameForm: new FormControl('', Validators.required),
    descriptionForm: new FormControl(''),
    imageForm: new FormControl(''),
    phoneForm: new FormControl('', Validators.required),
    availableForm: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.idAuthor = this.route.snapshot.params['id'];
    this.form.valueChanges.subscribe(console.log);
  }

  getArtist(): void {
    this.artistsService.getArtists().subscribe((data) => {
      this.artistas = data;
    });
  }

  addTattoMaker() {
    const tatuador = new TattoMaker(
      this.form.value.nameForm || '',
      this.form.value.descriptionForm || '',
      this.form.value.imageForm || '',
      this.form.value.phoneForm || '',
      this.form.value.availableForm || ''
    );

    this.artistsService.createArtist(tatuador).subscribe((data) => {
      console.log('se creo el artista', data);
    });
  }

  deleteTattoMaker(idArtist: number): void {
    this.artistsService.deleteArtist(idArtist).subscribe(() => {
      this.getArtist();
    });
  }

  editTattoMaker(artista: TattoMaker): void {
    this.artistsService.updateArtist(artista).subscribe(() => {
      this.getArtist();
    });
  }

  // saveTattoMaker(){
  //   const saveWorker = new TattoMaker(this.idArtistForm, this.nameForm,
  //     this.descriptionForm, this.imageForm,
  //      this.phoneForm, this.availableForm);
  //      if(this.idArtistForm =! null){
  //       this.artistsService.updateArtist(this.idArtistForm, saveWorker){
  //         else {
  //           this.artistsService.createArtist(saveWorker);
  //         }
  //         this.router.navigate(['tattoMakers'])
  //       }
  //      }
  //   }
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
