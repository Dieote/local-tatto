import { CommentsService } from './../../services/comments.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/modal/comment.model';

import { ToastrService } from 'ngx-toastr';
// import 'ngx-toastr/toastr-bs5-alert';

@Component({
  selector: 'app-coments',
  templateUrl: './coments.component.html',
  styleUrls: ['./coments.component.scss'],
})
export class ComentsComponent implements OnInit {
  newComment: Comment = new Comment('');
  arrayComentario: Comment[] = [];
  rtaPost: string = '';

  form: FormGroup = new FormGroup({
    formComentario: new FormControl(''),
  });

  constructor(
    private commentsService: CommentsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.subscribeArrayComment();
  }

  subscribeArrayComment() {
    this.commentsService.getAllComment().subscribe((respons) => {
      this.arrayComentario = respons;
    });
  }

  sendComent() {
    let commentPost = new Comment(this.form.value.formComentario || '');

    this.callSuccesToastr('Comentario enviado correctamente');
    this.commentsService.createComment(commentPost).subscribe((data) => {
      this.rtaPost = data;

      if (data === 'Funciona') {
        this.subscribeArrayComment();
      }
    });
    this.newComment = new Comment('');
  }

  callSuccesToastr(mensaje: string) {
    this.toastr.success(mensaje);
  }
  deleteComent(id: number): void {
    this.toastr.success('Comentario borrado correctamente.', 'titulo', {
      progressBar: true,
    });
    this.commentsService.deleteComment(id).subscribe(() => {
      this.subscribeArrayComment();
    });
  }

  sendToEmail(comment: Comment) {
    const text = {
      to: 'correo@empresatatto.com',
      subject: 'Opinion de usuario',
      body: comment,
    };
    //esto deberia ir al service
    //this.http.post('https://api.correo.com/enviar', text).subscribe(
    //   () => {
    //     console.log('Comentario enviado por correo electrónico.');
    //   },
    //   (error) => {
    //     console.error(
    //       'Error al enviar el comentario por correo electrónico:',
    //       error
    //     );
    //   }
    // );
  }
}
