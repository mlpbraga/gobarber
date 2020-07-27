import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import SessionsController from '../controllers/SessionController';

const sessionsRouter = Router();
const controller = new SessionsController();
sessionsRouter.post(
  '/',
  celebrate({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  controller.create,
);

export default sessionsRouter;
