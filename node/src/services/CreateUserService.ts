import { getCustomRepository } from 'typeorm';
import User from '../models/Users';
import UsersRepository from '../repositories/UsersRepository';

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
      throw Error('This email is already in use');
    }
    const user = await usersRepository.create({
      name,
      email,
      password,
    });
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
