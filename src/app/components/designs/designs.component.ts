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

  upload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formImage = new FormData();
      formImage.append('file', file);
      this.mediaService.uploadFile(file).subscribe((response) => {
        console.log('response', response);
        this.loadImages(file);
      });
    }
  }

  saveImage() {
    const fileInput = document.getElementById('image') as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
      const formImage = new FormData();
      formImage.append('file', file);
      this.mediaService.uploadFile(file).subscribe((response) => {
        this.callToastrSuccesForm('Imagen cargada correctamente.');
        this.loadImages(file);
      });
    }
  }

  loadImages(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const imageModal = new ImageModal(
        0,
        file.name,
        file.type,
        file.size,
        '',
        '',
        [],
        event.target.result
      );
      this.images.push(imageModal);
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
        console.log('Error al cargar la imagen', error);
      }
    );
  }

  deleteImage(id: number): void {
    this.mediaService.deleteImage(id).subscribe(() => {
      this.toastr.success('Imagen eliminada correctamente.');
      this.images = this.images.filter((image) => image.id !== id);
    });
  }

  callToastrSuccesForm(mensaje: string) {
    const toastrConfig: Partial<IndividualConfig> = {
      progressBar: true,
    };
    this.toastr.success(mensaje, '', toastrConfig);
  }
}
