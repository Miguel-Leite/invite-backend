import { CustomerRepository } from '@app/repositories/customer-repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

interface AuthCustomerServiceRequest {
  email: string;
  password: string;
}

export interface AuthCustomerServiceResponse {
  id: string;
  email: string;
  name: string;
  access_token: string;
}

@Injectable()
export class AuthCustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: AuthCustomerServiceRequest): Promise<AuthCustomerServiceResponse> {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      throw new UnauthorizedException();
    }

    if (!customer.password) {
      throw new UnauthorizedException();
    }

    const passwordMatched = await compare(password, customer.password);

    if (!passwordMatched) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: customer.id,
      name: customer.name,
      email: customer.email,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      access_token,
    };
  }
}
