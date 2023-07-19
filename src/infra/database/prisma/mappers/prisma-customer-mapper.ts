import { Customers as RawCustomer } from '@prisma/client';
import { Customer } from '@app/entities/customer';

export class PrismaCustomerMapper {
  static toPrisma(customer: Customer) {
    return {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      password: customer.password,
    };
  }

  static toDomain(raw: RawCustomer): Customer {
    return new Customer(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        ...raw.updated_at,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawCustomer[]): Customer[] {
    return raw.map((customer) => this.toDomain(customer));
  }
}
