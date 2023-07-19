import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { PrismaCustomerMapper } from '../mappers/prisma-customer-mapper';
import { Customer } from '@app/entities/customer';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Customer | null> {
    const customer = await this.prisma.customers.findUnique({
      where: { id },
    });

    if (!customer) {
      return null;
    }

    return PrismaCustomerMapper.toDomain(customer);
  }
  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prisma.customers.findFirst({
      where: {
        email,
      },
    });

    if (!customer) {
      return null;
    }

    return PrismaCustomerMapper.toDomain(customer);
  }
  async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customers.findMany();
    return await PrismaCustomerMapper.toDomainList(customers);
  }
  async create(customer: Customer): Promise<void> {
    await this.prisma.customers.create({
      data: PrismaCustomerMapper.toPrisma(customer),
    });
  }
  async save({ id, ...data }: Customer): Promise<void> {
    await this.prisma.customers.update({
      where: { id },
      data,
    });
  }
}
