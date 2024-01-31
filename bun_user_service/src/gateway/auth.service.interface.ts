export interface IAuthService {
  login(email: string, passorwd: string): Promise<string>;
  logout(token: string): Promise<boolean>;
  validateToken(token: string): Promise<boolean>;
}
