/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class AppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;
    const listProviders = container.resolve(ListProvidersService);
    const providers = await listProviders.execute({ userId });
    return res.json(providers);
  }
}
