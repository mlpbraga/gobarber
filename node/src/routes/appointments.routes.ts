import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointments';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;
  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentsInSameDate = appointments.find(appointment =>
    isEqual(appointment.date, parsedDate),
  );

  if (findAppointmentsInSameDate) {
    return res
      .status(400)
      .json({ error: 'This appointment is already booked' });
  }
  const appointment = new Appointment(provider, parsedDate);
  appointments.push(appointment);
  return res.json(appointment);
});

export default appointmentsRouter;