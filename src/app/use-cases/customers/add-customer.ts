import { Injectable } from '@nestjs/common';
import { EmailAlreadyExists } from './errors/email-already-exists';
import { hash } from 'bcryptjs';
import { Customer } from '@app/entities/customer';
import { CustomerRepository } from '@app/repositories/customer-repository';

interface AddCustomerRequest {
  name: string;
  email: string;
  password: string;
}

interface AddCustomerResponse {
  customer: Customer;
}

@Injectable()
export class AddCustomer {
  constructor(private customerRepository: CustomerRepository) {}

  async execute({
    email,
    name,
    password,
  }: AddCustomerRequest): Promise<AddCustomerResponse> {
    const emailAlreadyExists = await this.customerRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new EmailAlreadyExists();
    }

    const hashPassword = await hash(password, 10);
    const customer = new Customer({
      email,
      name,
      password: hashPassword,
    });

    await this.customerRepository.create(customer);

    return { customer };
  }
}
