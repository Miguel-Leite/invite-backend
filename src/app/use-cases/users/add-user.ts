import { User } from '@app/entities/user';
import { UserRepository } from '@app/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { EmailAlreadyExists } from './errors/email-already-exists';
import { hash } from 'bcryptjs';

interface AddUserRequest {
  name: string;
  email: string;
}

interface AddUserResponse {
  user: User;
}

@Injectable()
export class AddUser {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name }: AddUserRequest): Promise<AddUserResponse> {
    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new EmailAlreadyExists();
    }

    const password = await hash('password', 10);
    const user = new User({
      email,
      name,
      password,
    });

    await this.userRepository.create(user);

    return { user };
  }
}
