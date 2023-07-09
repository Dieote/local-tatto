import { CommentsService } from './../../services/comments.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/modal/comment.model';

import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-coments',
  templateUrl: './coments.component.html',
  styleUrls: ['./coments.component.scss'],
})
export class ComentsComponent implements OnInit {
  newComment: Comment = new Comment('', '');
  arrayComentario: Comment[] = [];
  rtaPost: any;

  form: FormGroup = new FormGroup({
    formComentario: new FormControl(''),
    formUsername: new FormControl(''),
  });

  constructor(
    private commentsService: CommentsService,
    private toastr: ToastrService,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.subscribeArrayComment();
    this.form.addControl('formUsername', new FormControl(''));
  }

  subscribeArrayComment() {
    this.commentsService.getAllComment().subscribe((respons) => {
      this.arrayComentario = respons;
    });
  }

  sendComent() {
    let commentPost = new Comment(
      this.form.value.formComentario || '',
      this.form.value.formUsername || ''
    );

    this.callSuccesToastr('Comentario enviado correctamente');
    this.commentsService.createComment(commentPost).subscribe((data) => {
      this.rtaPost = data;

      if (data) {
        this.subscribeArrayComment();
      }
    });
    this.form.reset();
  }

  callSuccesToastr(mensaje: string) {
    this.toastr.success(mensaje);
  }

  deleteComent(id: number): void {
    this.commentsService.deleteComment(id).subscribe(
      (data: any) => {
        this.toastr.success('Comentario eliminado correctamente.');
        console.log(data.message);
        this.refresh();
      },
      (error) => {
        this.toastr.error('Error al eliminar el comentario.');
        console.error('Error al eliminar el comentario:', error);
      }
    );
  }

  refresh(): void {
    this.subscribeArrayComment();
  }
}
