/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class UsersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ userId });
    return res.status(200).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { userId, name, email, password, oldPassword } = req.body;
    const createUser = container.resolve(UpdateProfileService);
    const user = await createUser.execute({
      userId,
      name,
      email,
      password,
      oldPassword,
    });
    delete user.password;
    return res.status(202).json(user);
  }
}
