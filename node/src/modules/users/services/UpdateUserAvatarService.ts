import fs from 'fs';
import { injectable, inject } from 'tsyringe';
import path from 'path';
import uploadConfig from '../../../config/upload';
import User from '../infra/typeorm/entities/Users';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const user = await this.usersRepository.findById(userId);
    if (!user)
      throw new AppError(
        'Only authenticated users can change their avatar',
        401,
      );
    if (user.avatar) {
      const avatarPath = path.join(uploadConfig.directory, user.avatar);
      const fileExist = await fs.promises.stat(avatarPath);

      if (fileExist) {
        await fs.promises.unlink(avatarPath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
