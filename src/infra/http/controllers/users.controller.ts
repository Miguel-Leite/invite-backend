import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { AddUser } from '@app/use-cases/users/add-user';
import { ListUsers } from '@app/use-cases/users/list-users';

import { UserViewModel } from '../view-models/user-view-model';
import { CreateUserBody } from '../dtos/create-user-body';
import { AuthUserService } from '../auth/services/auth.user.service';
import { HttpExceptionFilter } from '@helpers/json-exception.filter';
import { LoginBody } from '../dtos/login-body';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private addUser: AddUser,
    private listUsers: ListUsers,
    private authUserService: AuthUserService,
  ) {}

  @Get('/')
  async index() {
    const { users } = await this.listUsers.execute();
    return { users: users.map(UserViewModel.toHTTP) };
  }

  @Post('/')
  async create(@Body() data: CreateUserBody) {
    const { user } = await this.addUser.execute(data);
    return { user: UserViewModel.toHTTP(user) };
  }

  @UseFilters(new HttpExceptionFilter())
  @Post('/login')
  async login(@Body() { email, password }: LoginBody) {
    const response = await this.authUserService.execute({
      email,
      password,
    });

    return response;
  }
}
