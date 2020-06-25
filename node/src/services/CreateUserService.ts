import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/Users';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';

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
