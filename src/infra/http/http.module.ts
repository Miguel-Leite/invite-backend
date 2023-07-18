import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
})
export class HttpModule {}
