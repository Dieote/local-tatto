import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public loadingService: LoadingService) {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  okLogin() {
    console.log('Click en boton login');
  }

  openModal() {
    debugger;
  }
}
