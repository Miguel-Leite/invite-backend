import { JwtService } from '@nestjs/jwt';
import authConfig from '../config';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer-repository';
import { AddCustomer } from '@app/use-cases/customers/add-customer';
import { AuthCustomerService } from './auth.customer.service';

describe('Authentication customer service', () => {
  it('should be able to authenticate a customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const jwtService = new JwtService({
      secret: authConfig.jwt.secret,
    });
    const addUser = new AddCustomer(customerRepository);

    const { customer } = await addUser.execute({
      email: 'john@example.com',
      name: 'John',
      password: 'password',
    });

    const authUserService = new AuthCustomerService(
      customerRepository,
      jwtService,
    );

    const { access_token } = await authUserService.execute({
      email: customer.email,
      password: 'password',
    });

    expect(access_token).toBeTruthy();

    const decodedToken = jwtService.decode(access_token);
    expect(decodedToken).toBeTruthy();

    if (decodedToken) {
      expect(decodedToken.sub).toEqual(customerRepository.customers[0].id);
    }
  });
});
