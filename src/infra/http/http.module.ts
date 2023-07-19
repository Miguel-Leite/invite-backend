import { Module } from '@nestjs/common';
import { ListCustomers } from '@app/use-cases/customers/list-customers';
import { AddCustomer } from '@app/use-cases/customers/add-customer';
import { ListUsers } from '@app/use-cases/users/list-users';
import { AddUser } from '@app/use-cases/users/add-user';

import { DatabaseModule } from '@infra/database/database.module';

import { AuthModule } from './auth/auth.module';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UsersController, CustomersController],
  providers: [AddUser, ListUsers, AddCustomer, ListCustomers],
})
export class HttpModule {}
