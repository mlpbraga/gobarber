/* eslint-disable camelcase */
import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const controller = new ProvidersController();

providersRouter.use(ensureAuthenticated);
providersRouter.get('/', controller.index);

export default providersRouter;
