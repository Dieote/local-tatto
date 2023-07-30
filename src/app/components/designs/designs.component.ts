import { LoginService } from 'src/app/services/login.service';
import { Component } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { ImageModal } from 'src/app/modal/image.model';
import { MediaService } from 'src/app/services/media.service';
import baserUrl from 'src/app/services/helper';

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.scss'],
})
export class DesignsComponent {
  images: ImageModal[] = [];
  urlBase = baserUrl;

  constructor(
    private mediaService: MediaService,
    private toastr: ToastrService,
    public loginService: LoginService
  ) {
    this.loadImagesFromBack();
  }

  saveImage() {
    const fileInput = document.getElementById('image') as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
      this.loadImages(file);
    }
  }

  loadImages(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.mediaService.uploadFile(file).subscribe((response) => {
        const imageModal = new ImageModal(
          0,
          response.fileName,
          response.fileType,
          response.size,
          response.uuid,
          response.systemName,
          [],
          event.target.result
        );
        this.images.push(imageModal);
        this.callToastrSuccess('Imagen guardada correctamente.', 'Éxito');
      });
    };
    reader.readAsDataURL(file);
  }

  loadImagesFromBack() {
    this.mediaService.getImages().subscribe(
      (response: ImageModal[]) => {
        this.images = response.map((image) => {
          const imageUrl = `${this.urlBase}/media/show/${image.fileName}`;
          return { ...image, imageUrl };
        });
      },
      (error) => {
        this.callToastrError('Error al cargar las imagenes');
        console.log('Error al cargar la imagen', error);
      }
    );
  }

  deleteImage(uuid: string): void {
    console.log('Uuid:', uuid);
    this.mediaService.deleteImage(uuid).subscribe(
      () => {
        this.images = this.images.filter((image) => image.uuid !== uuid);
        this.callToastrSuccess('Imagen eliminada correctamente.', 'Éxito');
      },
      (error: any) => {
        console.error('Error al eliminar la imagen.', error);
        this.callToastrError('Error al eliminar la imagen');
      }
    );
  }

  callToastrSuccess(mensaje: string, titulo: string) {
    const toastrConfig: Partial<IndividualConfig> = {
      progressBar: true,
    };
    this.toastr.success(mensaje, titulo, toastrConfig);
  }
  callToastrError(mensaje: string) {
    const toastrConfig: Partial<IndividualConfig> = {
      progressBar: true,
    };
    this.toastr.error(mensaje, '', toastrConfig);
  }
}
