import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';

interface ListUsersResponse {
  users: User[];
}

@Injectable()
export class ListUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<ListUsersResponse> {
    const users = await this.userRepository.findAll();
    return { users };
  }
}
