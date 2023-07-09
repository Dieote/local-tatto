import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { CitaModel } from 'src/app/modal/cita.model';
import { TattoMaker } from 'src/app/modal/tattoMaker.model';
import { ArtistsService } from 'src/app/services/artists.service';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.scss'],
})
export class CitaFormComponent implements OnInit {
  selectedArtist: string = '';
  tatuadores: TattoMaker[] = [];
  tatuadorSeleccionado: any;

  constructor(
    private artistsService: ArtistsService,
    private citaService: CitaService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  formCita = new FormGroup({
    nameCita: new FormControl('', Validators.required),
    phoneCita: new FormControl('', Validators.required),
    idArtistaForm: new FormControl(''),
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
  callToastrSuccesForm(mensaje: string) {
    const toastrConfig: Partial<IndividualConfig> = {
      progressBar: true,
    };
    this.toastr.success(mensaje, '', toastrConfig);
  }
  isFieldInvalid(fieldName: string) {
    const field = this.formCita.get(fieldName);
    return field?.invalid && (field.dirty || field.touched);
  }

  isFormValid() {
    return this.formCita.dirty && this.formCita.valid;
  }

  addCita() {
    const newCita = this.citaCreate();
    this.callToastrSuccesForm('Cita creada correctamente.');
    this.citaService.createCita(newCita).subscribe((data) => {
      console.log('Se creo la cita', data);
      this.route.navigate(['schedule']);
    });
  }

  private citaCreate(id?: number): CitaModel {
    let citaAux = new CitaModel(
      this.formCita.value.nameCita || '',
      this.formCita.value.idArtistaForm || '',
      this.formCita.value.phoneCita || '',
      this.formCita.value.availableCita || ''
    );

    if (id) {
      citaAux.id = id;
    }
    return citaAux;
  }
}
