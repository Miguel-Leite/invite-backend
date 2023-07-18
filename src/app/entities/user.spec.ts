import { User } from './user';

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      email: 'user@example.com',
      name: 'john',
      password: 'password',
    });

    expect(user).toBeTruthy();
  });
});
