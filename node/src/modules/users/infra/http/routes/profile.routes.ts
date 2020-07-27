import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
profileRouter.use(ensureAuthenticated);

const profileController = new ProfileController();

profileRouter.put(
  '/',
  celebrate({
    body: {
      name: Joi.string().required(),
      email: Joi.string().email(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);
profileRouter.get('/', profileController.show);

export default profileRouter;
