import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UsersRepository from '@modules/users/infra/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/Users';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailAlreadyExists = await usersRepository.findByEmail(email);
    if (emailAlreadyExists) {
      throw new AppError('This email is already in use');
    }
    const hashedPassword = await hash(password, 8);
    const user = await usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
