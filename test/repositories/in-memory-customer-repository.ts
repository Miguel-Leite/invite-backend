import { Customer } from '@app/entities/customer';
import { CustomerRepository } from '@app/repositories/customer-repository';

export class InMemoryCustomerRepository implements CustomerRepository {
  public customers: Customer[] = [];
  async findById(customersId: string): Promise<Customer | null> {
    const customer = this.customers.find((item) => item.id === customersId);

    if (!customer) {
      return null;
    }

    return customer;
  }
  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find((item) => item.email === email);

    if (!customer) {
      return null;
    }

    return customer;
  }
  async findAll(): Promise<Customer[]> {
    return this.customers;
  }
  async create(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }
  async save(customer: Customer): Promise<void> {
    const customerIndex = this.customers.findIndex(
      (item) => item.id === customer.id,
    );

    if (customerIndex >= 0) {
      this.customers[customerIndex] = customer;
    }
  }
}
