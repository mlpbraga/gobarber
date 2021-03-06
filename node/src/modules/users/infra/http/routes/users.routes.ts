import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/ensureAuthenticated';
import UsersController from '../controllers/UserController';
import UsersAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

usersRouter.post(
  '/',
  celebrate({
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
