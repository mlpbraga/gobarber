import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotController = new ForgotPasswordController();
const resetController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    body: {
      email: Joi.string().email().required(),
    },
  }),
  forgotController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    body: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetController.create,
);

export default passwordRouter;
