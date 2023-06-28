import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TattoMaker } from 'src/app/modal/tattoMaker.model';
import { ArtistsService } from 'src/app/services/artists.service';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.scss'],
})
export class CitaFormComponent implements OnInit {
  selectedArtist: string = '';
  tatuadores: TattoMaker[] = [];
  tatuadorSeleccionado: any;

  constructor(private artistsService: ArtistsService) {}

  formCita = new FormGroup({
    idArtistaForm: new FormControl(''),
    nameCita: new FormControl('', Validators.required),
    phoneCita: new FormControl('', Validators.required),
    availableCita: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.getAllArtist();
  }

  subscribeIdArtist() {
    const idArtista = this.formCita.get('idArtistaForm')?.value;
    console.log(idArtista);
    this.tatuadorSeleccionado = this.tatuadores.find(
      (artist) => artist.id == idArtista
    );
  }

  getAllArtist() {
    this.artistsService.getArtists().subscribe((tatuadores) => {
      this.tatuadores = tatuadores;
    });
  }
}
