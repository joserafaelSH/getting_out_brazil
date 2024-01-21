import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnvConfigModule } from './shared/infra/config/environment/env-config/env-config.module';

@Module({
  imports: [EnvConfigModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
