import { Comment } from './../modal/comment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserUrl from './helper';

@Injectable()
export class CommentsService {
  userComment: Comment[] = [];

  urlBase = baserUrl;
  constructor(private httpClient: HttpClient) {}

  getAllComment(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(this.urlBase + '/get-comments');
  }

  createComment(comment: Comment): Observable<string> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        comment: comment.comment,
        username: comment.username,
      },
    };

    return this.httpClient.post<string>(
      this.urlBase + '/post-comments',
      option.body,
      { headers: option.headers }
    );
  }

  deleteComment(id: number): Observable<string> {
    const idNum = this.urlBase + '/delete-comment/' + id;
    return this.httpClient.delete<string>(idNum);
  }
}
