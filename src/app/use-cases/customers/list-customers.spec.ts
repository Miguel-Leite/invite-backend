import { AddCustomer } from './add-customer';
import { ListCustomers } from './list-customers';
import { InMemoryCustomerRepository } from '@test/repositories/in-memory-customer-repository';

describe('List customers use case', () => {
  it('should be able to create a list customers', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const addCustomer = new AddCustomer(customerRepository);
    const listCustomers = new ListCustomers(customerRepository);

    const { customer } = await addCustomer.execute({
      email: 'john@example.com',
      name: 'John',
      password: 'password',
    });

    const { customers } = await listCustomers.execute();

    expect(customers[0]).toEqual(customer);
  });
});
