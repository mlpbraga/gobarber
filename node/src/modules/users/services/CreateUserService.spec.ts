import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUsersServices from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let repository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUsersServices;

describe('CreateUser', () => {
  beforeEach(() => {
    repository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUsersServices(repository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
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
