import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { LoadingService } from 'src/app/services/loading.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  loginForm = {
    username: '',
    password: '',
  };

  constructor(
    private toastr: ToastrService,
    public loginservice: LoginService,
    private router: Router
  ) {}

  formSubmit() {
    if (
      this.loginForm.username.trim() == '' ||
      this.loginForm.username.trim() == null
    ) {
      this.callToastrErrorForm('Usuario requerido.');
      return;
    }
    if (
      this.loginForm.password.trim() == '' ||
      this.loginForm.password.trim() == null
    ) {
      this.callToastrErrorForm('Password requerida.');
      return;
    }
    this.loginservice.generateToken(this.loginForm).subscribe(
      (data: any) => {
        console.log(data);

        this.loginservice.loginUser(data.token);
        this.loginservice.getCurrentUser().subscribe((user: any) => {
          this.loginservice.setUser(user);
          console.log(user);

          if (this.loginservice.getUserRol() == 'ADMIN') {
            //dash admin
            // window.location.href = '/admin';
            this.router.navigate(['admin']);
          } else if (this.loginservice.getUserRol() == 'USER') {
            //dash user
            // window.location.href = '/user-dash';
            this.router.navigate(['user-dash']);
          } else {
            this.loginservice.logOut();
          }
        });
      },
      (error) => {
        console.log(error);
        this.callToastrErrorForm('Detalles no validos.');
      }
    );
  }

  openModal() {
    debugger;
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

  public logOut() {
    this.loginservice.logOut();
    window.location.reload();
  }
}
