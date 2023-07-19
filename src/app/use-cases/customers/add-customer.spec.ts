import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer-repository';
import { AddCustomer } from './add-customer';

describe('Customer use case', () => {
  it('should be able to create a customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const addCustomer = new AddCustomer(customerRepository);

    const { customer } = await addCustomer.execute({
      email: 'john@example.com',
      name: 'John',
      password: 'password',
    });

    expect(customerRepository.customers[0]).toEqual(customer);
  });
});
