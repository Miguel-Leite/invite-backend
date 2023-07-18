import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { AddUser } from './add-user';

describe('User use case', () => {
  it('should be able to create a user', async () => {
    const userRepository = new InMemoryUserRepository();
    const addUser = new AddUser(userRepository);

    const { user } = await addUser.execute({
      email: 'john@example.com',
      name: 'John',
    });

    expect(userRepository.users[0]).toEqual(user);
  });
});
