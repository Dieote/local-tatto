export class Comment {
  comment: string;
  id: number = 0;
  username: string;

  constructor(userComment: string, username: string) {
    this.comment = userComment;
    this.username = username;
  }
}
