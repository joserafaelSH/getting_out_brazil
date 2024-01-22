import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnvConfigModule } from './shared/infra/config/environment/env-config/env-config.module';
import { UsersModule } from './user/infra/user.module';

@Module({
  imports: [EnvConfigModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
