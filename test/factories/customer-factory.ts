import { Customer, CustomerProps } from '@app/entities/customer';

type Override = Partial<CustomerProps>;

export function makeCustomer(override: Override = {}) {
  return new Customer({
    email: 'john@example.com',
    name: 'john',
    password: 'password',
    avatar: 'http://app.example.com/avatar.jpg',
    ...override,
  });
}
