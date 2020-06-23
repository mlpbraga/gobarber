import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRepository = new AppointmentsRepository();

const appointmentsRouter = Router();

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );
    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });
    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();
  return res.json(appointments);
});

export default appointmentsRouter;
