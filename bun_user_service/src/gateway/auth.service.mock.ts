import type { IAuthService } from "./auth.service.interface";

export class AuthServiceMock implements IAuthService {
  login(email: string, password: string): Promise<string> {
    return Promise.resolve(`token_${email}_${password}`);
  }
  logout(token: string): Promise<boolean> {
    const random = Math.random();
    if (random < 0.5) {
      return Promise.reject(false);
    }
    return Promise.resolve(true);
  }
  validateToken(token: string): Promise<boolean> {
    const random = Math.random();
    console.log(random);
    if (random < 0.5) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }
}
