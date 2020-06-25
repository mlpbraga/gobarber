import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email.');
    }
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Invalid password.');
    }
    return {
      user,
    };
  }
}

export default AuthenticateUserService;
