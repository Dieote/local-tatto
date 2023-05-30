import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public loadingService: LoadingService) {}

  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl(''),
  });

  okLogin() {
    const email = this.userForm.value.email || '';
    const password = this.userForm.value.password || '';

    this.loadingService.getLoginJson().subscribe(() => {
      if (email == 'admin' && password == 'admin') {
        this.loadingService.setLogin(true);
      } else {
        this.loadingService.setLogin(false);
      }
    });
  }

  openModal() {
    debugger;
  }
}
