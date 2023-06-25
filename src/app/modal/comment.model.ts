export class Comment {
  comment: string;
  id: number = 0;

  constructor(userComment: string) {
    this.comment = userComment;
  }
}
