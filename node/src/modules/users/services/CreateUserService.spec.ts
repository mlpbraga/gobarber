import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUsersServices from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const repository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUsersServices(repository, fakeHashProvider);
    const result = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234',
    });

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email');
    expect(result.email).toBe('john@doe.com');
  });
  it('should not be able to create two users with the same email', async () => {
    const repository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUsersServices(repository, fakeHashProvider);
    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '1234',
    });
    expect(
      createUser.execute({
        name: 'Joana Doe',
        email: 'john@doe.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
