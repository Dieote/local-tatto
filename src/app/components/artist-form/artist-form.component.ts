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
    this.getArtistById();
  }

  getArtisList(): void {
    this.artistsService.getArtists().subscribe((data) => {
      this.artistas = data;
    });
  }

  getArtistById() {
    this.artistsService.getArtists().subscribe((tatuadores) => {
      let artistById = tatuadores.find((data) => data.id == this.idAuthor);

      this.form.get('nameForm')?.patchValue(artistById?.name || '');
      this.form
        .get('descriptionForm')
        ?.patchValue(artistById?.description || '');
      this.form.get('imageForm')?.patchValue(artistById?.image || '');
      this.form.get('phoneForm')?.patchValue(artistById?.phone || '');
      this.form.get('availableForm')?.patchValue(artistById?.available || '');
    });
  }

  addTattoMaker() {
    const tatuador = this.tattoMakerCreate();
    this.artistsService.createArtist(tatuador).subscribe((data) => {
      console.log('se creo el artista', data);
    });
  }

  deleteTattoMaker(idArtist: number): void {
    this.artistsService.deleteArtist(idArtist).subscribe(() => {
      this.getArtisList();
    });
  }

  editTattoMaker(): void {
    let artista = this.tattoMakerCreate(this.idAuthor);
    this.artistsService.updateArtist(artista).subscribe(() => {
      this.getArtisList();
    });
  }

  private tattoMakerCreate(id?: number): TattoMaker {
    let tatuadorAux = new TattoMaker(
      this.form.value.nameForm || '',
      this.form.value.descriptionForm || '',
      this.form.value.imageForm || '',
      this.form.value.phoneForm || '',
      this.form.value.availableForm || ''
    );
    if (id) {
      tatuadorAux.id = id;
    }
    return tatuadorAux;
  }
}
