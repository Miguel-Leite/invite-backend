import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import authConfig from './config';
import { AuthUserService } from './services/auth.user.service';
import { AuthCustomerService } from './services/auth.customer.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: authConfig.jwt.secret,
      signOptions: { expiresIn: authConfig.jwt.expiresIn },
    }),
    DatabaseModule,
  ],
  providers: [AuthUserService, AuthCustomerService],
  exports: [AuthUserService, AuthCustomerService],
})
export class AuthModule {}
