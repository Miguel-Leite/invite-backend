import { Users as RawUser } from '@prisma/client';
import { User } from '@app/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        ...raw.updated_at,
      },
      raw.id,
    );
  }

  static toDomainList(raw: RawUser[]): User[] {
    return raw.map((user) => this.toDomain(user));
  }
}
