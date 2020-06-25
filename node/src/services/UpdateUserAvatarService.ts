import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import fs from 'fs';

import path from 'path';
import uploadConfig from '../config/upload';
import User from '../models/Users';

interface Request {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(userId);
    if (!user)
      throw new Error('Only authenticated users can change their avatar');
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
