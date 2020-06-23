import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRepository = new AppointmentsRepository();

const appointmentsRouter = Router();

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;
  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentsInSameDate = appointmentsRepository.findByDate(
    parsedDate,
  );
  if (findAppointmentsInSameDate) {
    return res
      .status(400)
      .json({ error: 'This appointment is already booked' });
  }
  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });
  return res.json(appointment);
});

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();
  return res.json(appointments);
});

export default appointmentsRouter;
