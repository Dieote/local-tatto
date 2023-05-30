import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from './../../services/loading.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public loadingService: LoadingService) {}

  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl(''),
  });

  okLogin() {
    const email = this.userForm.value.email || '';
    const password = this.userForm.value.password || '';

    this.loadingService.getLoginJson().subscribe((login) => {
      if (email == 'admin' && password == 'admin') {
        this.loadingService.setLogin(true);
      } else {
        this.loadingService.setLogin(false);
      }
    });
  }
}
