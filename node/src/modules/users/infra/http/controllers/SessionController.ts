/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const authenticateUserService = container.resolve(AuthenticateUserService);
    const { email, password } = req.body;
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });
    delete user.password;
    return res.json({ user, token });
  }
}
