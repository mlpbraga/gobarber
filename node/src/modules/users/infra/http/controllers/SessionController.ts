/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const authenticateUserService = container.resolve(AuthenticateUserService);
    const { email, password } = req.body;
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return res.json({ user: classToClass(user), token });
  }
}
