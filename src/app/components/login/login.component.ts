import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from './../../services/loading.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public loadingService: LoadingService) {}


  userForm = new FormGroup ({
    email: new FormControl("", Validators.required),
    password: new FormControl(""),
  });

  okLogin(){
    this.userForm.value.email;
    this.loadingService.setLogin(
      this.userForm.value.email || '',
      this.userForm.value.password || '',
    );
  };
}
