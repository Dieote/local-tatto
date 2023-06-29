export class Login {
  email: string;
  password: string;
  userName: string;
  enabled: boolean;

  constructor(
    id: number,
    email: string,
    password: string,
    userName: string,
    enabled: boolean
  ) {
    this.email = email;
    this.password = password;
    this.userName = userName;
    this.enabled = enabled;
  }
}
