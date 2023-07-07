import { Comment } from './../modal/comment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CommentsService {
  userComment: Comment[] = [];
  urlBase = 'https://render-backend-xt14.onrender.com';

  constructor(private httpClient: HttpClient) {}

  getAllComment(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.urlBase + '/get-comments');
  }

  createComment(comment: Comment): Observable<string> {
    return this.httpClient.post<string>(
      this.urlBase + '/post-comments',
      comment
    );
  }

  deleteComment(id: number): Observable<string> {
    const idNum = this.urlBase + '/delete-comment/' + id;
    return this.httpClient.delete<string>(idNum);
  }
}
