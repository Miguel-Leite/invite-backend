import { Customer } from '@app/entities/customer';

export abstract class CustomerRepository {
  abstract findById(id: string): Promise<Customer | null>;
  abstract findByEmail(email: string): Promise<Customer | null>;
  abstract findAll(): Promise<Customer[]>;
  abstract create(customer: Customer): Promise<void>;
  abstract save(customer: Customer): Promise<void>;
}
