import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-coments',
  templateUrl: './coments.component.html',
  styleUrls: ['./coments.component.scss'],
})
export class ComentsComponent {
  newComment: String = '';
  comments: String[] = [];

  constructor(private http: HttpClient) {}

  sendComent() {
    this.comments.push(this.newComment);
    this.sendToEmail(this.newComment);
    this.newComment = '';
  }
  sendToEmail(userOpinion: String) {
    const text = {
      to: 'correo@empresatatto.com',
      subject: 'Opinion de usuario',
      body: userOpinion,
    };
    this.http.post('https://api.correo.com/enviar', text).subscribe(
      () => {
        console.log('Comentario enviado por correo electrónico.');
      },
      (error) => {
        console.error(
          'Error al enviar el comentario por correo electrónico:',
          error
        );
      }
    );
  }
}
