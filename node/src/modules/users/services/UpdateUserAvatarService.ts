import { getRepository } from 'typeorm';
import fs from 'fs';

import path from 'path';
import uploadConfig from '../../../config/upload';
import User from '../infra/typeorm/entities/Users';
import AppError from '../../../shared/errors/AppError';

interface Request {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(userId);
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

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
