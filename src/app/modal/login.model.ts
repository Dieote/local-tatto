export class Login {
  email: string;
  password: string;
  username: string;
  enabled: boolean;
  authorities?: Authority[];

  constructor(
    id: number,
    email: string,
    password: string,
    username: string,
    enabled: boolean
  ) {
    this.email = email;
    this.password = password;
    this.username = username;
    this.enabled = enabled;
  }

  static createEmpty(): Login {
    return new Login(0, '', '', '', false);
  }

  setAuthority(authority: Authority[]): void {
    this.authorities = authority;
  }
}

export interface Authority {
  authority: string;
}
