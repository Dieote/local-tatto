import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
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
    public loginService: LoginService,
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
    this.loginService.generateToken(this.loginForm).subscribe(
      (data: any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);

          // if (this.loginService.getUserRol() == 'ADMIN') {
          //   //dash admin
          //   // window.location.href = '/admin';
          //   this.router.navigate(['admin']);
          // } else if (this.loginService.getUserRol() == 'USER') {
          //   //dash user
          //   // window.location.href = '/user-dash';
          //   this.router.navigate(['user-dash']);
          // } else {
          //   this.loginService.logOut();
          // }
          const getUserRol = this.loginService.getUserRol();
          if (getUserRol === 'ADMIN' || getUserRol === 'USER') {
            // this.router.navigate(['home']);
            window.location.href = 'home';
            this.loginService.loginStatusSubject.next(true);
          } else {
            this.loginService.logOut();
          }
        });
      },
      (error) => {
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
    this.loginService.logOut();
    window.location.reload();
  }
}
