import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      alert('Nombre usuario requerido.');
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        alert('Usuario agregado.');
      },
      (error) => {
        console.log(error);
        alert('Problema al agregar usuario.');
      }
    );
  }
}
