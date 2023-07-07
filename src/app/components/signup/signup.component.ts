import { Component, OnInit } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    password: '',
    email: '',
  };

  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    // console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      this.callToastrErrorForm('Nombre usuario requerido.');
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        this.callToastrSuccesForm('Usuario registrado correctamente.');
      },
      (error) => {
        console.log(error);
        this.callToastrErrorForm('Error al registrar usuario.');
      }
    );
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
}
