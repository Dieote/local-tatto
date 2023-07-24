import { ArtistsService } from './../../services/artists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TattoMaker } from 'src/app/modal/tattoMaker.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { ResponseModal } from 'src/app/modal/response.modal';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss'],
})
export class ArtistFormComponent implements OnInit {
  artistas: TattoMaker[] = [];
  artistaDataLoad: boolean = false;

  idAuthor: number = 0;
  constructor(
    private artistsService: ArtistsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
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
    if (this.idAuthor) {
      this.getArtistById();
      this.artistaDataLoad = true;
    }
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
      this.form.get('imageForm')?.patchValue(artistById?.imageName || '');
      this.form.get('phoneForm')?.patchValue(artistById?.phone || '');
      this.form.get('availableForm')?.patchValue(artistById?.available || '');
    });
  }

  addTattoMaker() {
    const tatuador = this.tattoMakerCreate();
    let file: File;
    const imageInput = document.getElementById('formFile') as HTMLInputElement;

    if (!imageInput.files || imageInput.files.length === 0) {
      this.callToastrErrorForm('Imagen obligatoria.');
      return;
    }
    // if (imageInput.files) {
    //   //TODO: Arreglar cuando no se carga una imagen, no llamar al service.
    //   file = imageInput.files[0];
    // }

    this.artistsService.createArtist(tatuador).subscribe(
      (response: ResponseModal) => {
        if (response.status === 'OK') {
          console.log('Se creo el artista', response.message);

          this.uploadImage(response.id, file);
          this.callToastrSuccesForm('Artista creado correctamente.');
          this.router.navigate(['artists']);
        } else {
          console.error('Error al crear la imagen:', response.message);
        }
      },
      (error) => {
        console.error('Error al crear el artista', error);
      }
    );
    this.router.navigate(['artists']);
  }

  private uploadImage(artistaId: number, imageFile: File) {
    this.artistsService
      .uploadImageArtist(artistaId, imageFile)
      .subscribe((response) => {
        console.log('Imagen cargada correctamente:', response);
      });
  }

  editTattoMaker(): void {
    let artista = this.tattoMakerCreate(this.idAuthor);
    this.callToastrSuccesForm('Artista editado correctamente.');
    this.artistsService.updateArtist(artista).subscribe(() => {
      this.getArtisList();
      this.router.navigate(['artists']);
    });
  }

  private tattoMakerCreate(id?: number): TattoMaker {
    let tatuadorAux = new TattoMaker(
      id || 0,
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

  callToastrSuccesForm(mensaje: string) {
    const toastrConfig: Partial<IndividualConfig> = {
      progressBar: true,
    };
    this.toastr.success(mensaje, '', toastrConfig);
  }
  callToastrErrorForm(mensaje: string) {
    const toastrConfig: Partial<IndividualConfig> = {
      progressBar: true,
    };
    this.toastr.error(mensaje, '', toastrConfig);
  }
  isFieldInvalid(fieldName: string) {
    const field = this.form.get(fieldName);
    return field?.invalid && (field.dirty || field.touched);
  }

  isFormValid() {
    return this.form.dirty && this.form.valid;
  }
}
