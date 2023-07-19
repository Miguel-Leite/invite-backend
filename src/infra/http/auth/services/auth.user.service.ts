import { UserRepository } from '@app/repositories/user-repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

interface AuthUserServiceRequest {
  email: string;
  password: string;
}

export interface AuthUserServiceResponse {
  id: string;
  email: string;
  name: string;
  access_token: string;
}

@Injectable()
export class AuthUserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: AuthUserServiceRequest): Promise<AuthUserServiceResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      access_token,
    };
  }
}
