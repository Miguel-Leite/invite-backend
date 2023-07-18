import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { AddUser } from './add-user';
import { ListUsers } from './list-users';

describe('List Users use case', () => {
  it('should be able to create a list users', async () => {
    const userRepository = new InMemoryUserRepository();
    const addUser = new AddUser(userRepository);
    const listUsers = new ListUsers(userRepository);

    const { user } = await addUser.execute({
      email: 'john@example.com',
      name: 'John',
    });

    const { users } = await listUsers.execute();

    expect(users[0]).toEqual(user);
  });
});
