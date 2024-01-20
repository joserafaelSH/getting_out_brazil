import { Injectable } from '@nestjs/common';
import { IEnvironmentVariables } from '../environment.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements IEnvironmentVariables {
  constructor(private readonly configService: ConfigService) {}
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }
  getPort(): string {
    return this.configService.get<string>('PORT');
  }
}
