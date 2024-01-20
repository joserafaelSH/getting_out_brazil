import { Controller, Get, Inject } from '@nestjs/common';
import { IEnvironmentVariables } from './config/environment/environment.interface';

type Message = {
  message: string;
};

@Controller()
export class AppController {
  constructor(
    @Inject('IEnvironmentVariables')
    private readonly envConfigService: IEnvironmentVariables,
  ) {}
  @Get()
  getHello(): Message {
    return { message: 'Hello World!' };
  }
}
