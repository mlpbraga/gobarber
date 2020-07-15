import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import { compare } from 'bcryptjs';
import User from '../infra/typeorm/entities/Users';
import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

const { jwt } = authConfig;

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email.', 401);
    }
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError('Invalid password.', 401);
    }
    const token = sign({}, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
