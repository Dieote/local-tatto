import { ArtistsService } from './../../services/artists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TattoMaker } from 'src/app/modal/tattoMaker.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { ResponseModal } from 'src/app/modal/response.modal';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.scss'],
})
export class ArtistFormComponent implements OnInit {
  artistas: TattoMaker[] = [];
  artistaDataLoad: boolean = false;
  loadedImageURL: SafeUrl | undefined;
  selectedImageFile: File | undefined;
  uuid: string = '';

  idAuthor: number = 0;
  constructor(
    private artistsService: ArtistsService,
    private mediaService: MediaService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private sanitizer: DomSanitizer
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

      this.uuid = artistById?.imageUuid || '';
      this.form.get('nameForm')?.patchValue(artistById?.name || '');
      this.form
        .get('descriptionForm')
        ?.patchValue(artistById?.description || '');
      this.form.get('phoneForm')?.patchValue(artistById?.phone || '');
      this.form.get('availableForm')?.patchValue(artistById?.available || '');

      //obtener imagen
      this.mediaService.getImageByName(artistById?.imageName || '').subscribe(
        (blob: Blob) => {
          const objUrl = URL.createObjectURL(blob);
          this.loadedImageURL = this.sanitizer.bypassSecurityTrustUrl(objUrl);
        },
        (error) => {
          console.error('Error al cargar imagen: ', error);
        }
      );
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
    if (imageInput.files) {
      file = imageInput.files[0];
    }

    this.artistsService.createArtist(tatuador).subscribe(
      (response: ResponseModal) => {
        if (response.status === 'OK') {
          console.log('Se creo el artista', response.message);
          if (file) {
            this.uploadImage(response.id, file);
          }
        } else {
          console.error('Error al crear la imagen:', response.message);
        }
      },
      (error) => {
        console.error('Error al crear el artista', error);
      }
    );
  }

  private uploadImage(artistaId: number, imageFile: File) {
    this.artistsService
      .uploadImageArtist(artistaId, imageFile)
      .subscribe((response) => {
        this.callToastrSuccesForm('Artista creado correctamente.');
        this.router.navigate(['artists']);
      });
  }

  editTattoMaker() {
    const imageInput = document.getElementById('formFile') as HTMLInputElement;
    let artista = this.tattoMakerCreate(this.idAuthor);

    if (imageInput.files && imageInput.files.length > 0) {
      this.selectedImageFile = imageInput.files[0];
      this.updateArtistData(artista, this.selectedImageFile);
    } else {
      this.updateArtistData(artista);
    }
  }
  private updateArtistData(artista: TattoMaker, file?: File) {
    this.artistsService.updateArtist(artista).subscribe(
      (response) => {
        if (response.status === 'OK') {
          if (file) {
            this.mediaService
              .updateImage(artista.imageUuid, this.selectedImageFile!)
              .subscribe((response) => {
                this.router.navigate(['artists']);
                this.callToastrSuccesForm('Artista editado correctamente.');
              });
          }
        } else {
          this.callToastrErrorForm('Error al actualizar artista.');
        }
      },
      (error) => {
        console.error('Error al actualizar artista:', error);
        this.callToastrErrorForm('Error al actualizar artista.');
      }
    );
  }

  private tattoMakerCreate(id?: number): TattoMaker {
    let tatuadorAux = new TattoMaker(
      id || 0,
      this.form.value.nameForm || '',
      this.form.value.descriptionForm || '',
      this.form.value.imageForm || '',
      this.uuid,
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
  /*
  // Metodo para manejar la selección de la imagen
  handleImageInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.mediaService.uploadFile(file).subscribe((response) => {
        // trae url de imagen relacionada
        const objectURL = URL.createObjectURL(file);
        this.loadedImageURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
    }
  }

  // Metodo elimina la imagen cargada
  removeLoadedImage() {
    this.loadedImageURL = undefined;
    const input = document.getElementById('formFile') as HTMLInputElement;
    input.value = ''; // Para borrar el nombre del archivo seleccionado en el input de tipo file
  } */
}
