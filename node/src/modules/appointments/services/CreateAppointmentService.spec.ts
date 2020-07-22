import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentsServices from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let repository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentsServices;

describe('CreateAppointment', () => {
  beforeEach(() => {
    repository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentsServices(repository);
  });
  it('should be able to create a new appointment', async () => {
    const date = new Date();
    const result = await createAppointment.execute({
      date,
      provider_id: '123',
    });

    expect(result).toHaveProperty('id');
    expect(result.provider_id).toBe('123');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const newAppointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      provider_id: '123',
    });
    expect(
      createAppointment.execute({
        date: newAppointment.date,
        provider_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
