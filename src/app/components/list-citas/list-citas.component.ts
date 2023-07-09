import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { CitaModel } from 'src/app/modal/cita.model';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-list-citas',
  templateUrl: './list-citas.component.html',
  styleUrls: ['./list-citas.component.scss'],
})
export class ListCitasComponent implements OnInit {
  citas: CitaModel[] = [];

  constructor(
    private citaService: CitaService,
    private toastr: ToastrService,
    public loginService: LoginService
  ) {}

  ngOnInit() {
    this.getCitas();
  }

  getCitas() {
    this.citaService.getCitas().subscribe((citas) => {
      this.citas = citas;
    });
  }
  deleteCita(id: number): void {
    this.toastr.success('Cita eliminada correctamente.');
    this.citaService.deleteCita(id).subscribe(() => {
      this.subscribeArrayCita();
    });
  }
  subscribeArrayCita() {
    this.citaService.getCitas().subscribe((respons) => {
      this.citas = respons;
    });
  }

  callToastrSuccesForm(mensaje: string) {
    const toastrConfig: Partial<IndividualConfig> = {
      progressBar: true,
    };
    this.toastr.success(mensaje, '', toastrConfig);
  }
}
