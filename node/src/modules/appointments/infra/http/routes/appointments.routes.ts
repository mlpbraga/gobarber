/* eslint-disable camelcase */
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const controller = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.post(
  '/',
  celebrate({
    body: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  controller.create,
);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
