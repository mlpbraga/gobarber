/* eslint-disable camelcase */
import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const controller = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.post('/', controller.create);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
