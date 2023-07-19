import { AddCustomer } from '@app/use-cases/customers/add-customer';
import { ListCustomers } from '@app/use-cases/customers/list-customers';
import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { CustomerViewModel } from '../view-models/customer-view-model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCustomerBody } from '../dtos/create-customer-body';
import { HttpExceptionFilter } from '@helpers/json-exception.filter';
import { AuthCustomerService } from '../auth/services/auth.customer.service';
import { LoginBody } from '../dtos/login-body';

@ApiBearerAuth()
@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(
    private addCustomer: AddCustomer,
    private authCustomerService: AuthCustomerService,
    private listCustomers: ListCustomers,
  ) {}

  @Get('/')
  async index() {
    const { customers } = await this.listCustomers.execute();
    return { customers: customers.map(CustomerViewModel.toHTTP) };
  }

  @Post('/')
  async create(@Body() data: CreateCustomerBody) {
    const { customer } = await this.addCustomer.execute(data);
    return { customer: CustomerViewModel.toHTTP(customer) };
  }

  @UseFilters(new HttpExceptionFilter())
  @Post('/login')
  async login(@Body() { email, password }: LoginBody) {
    const response = await this.authCustomerService.execute({
      email,
      password,
    });

    return response;
  }
}
