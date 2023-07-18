import { Customer } from './customer';

describe('Customer', () => {
  it('should be able to create a customer', () => {
    const customer = new Customer({
      email: 'test@example.com',
      name: 'test',
      password: 'password',
      avatar: 'http://example.com/avatar.jpg',
    });

    expect(customer).toBeTruthy();
  });
});
