import { JwtService } from '@nestjs/jwt';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import authConfig from '../config';
import { AuthUserService } from './auth.user.service';
import { AddUser } from '@app/use-cases/users/add-user';

describe('Authentication user service', () => {
  it('should be able to authenticate a user', async () => {
    const userRepository = new InMemoryUserRepository();
    const jwtService = new JwtService({
      secret: authConfig.jwt.secret,
    });
    const addUser = new AddUser(userRepository);

    const { user } = await addUser.execute({
      email: 'john@example.com',
      name: 'John',
    });

    const authUserService = new AuthUserService(userRepository, jwtService);

    const { access_token } = await authUserService.execute({
      email: user.email,
      password: 'password',
    });

    expect(access_token).toBeTruthy();

    const decodedToken = jwtService.decode(access_token);
    expect(decodedToken).toBeTruthy();

    if (decodedToken) {
      expect(decodedToken.sub).toEqual(userRepository.users[0].id);
    }
  });
});
