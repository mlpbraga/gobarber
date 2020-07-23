import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListMonthAvailabilityService from './ListMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listMonthAvailability: ListMonthAvailabilityService;

describe('ListMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listMonthAvailability = new ListMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '123',
      date: new Date(2020, 1, 29, 8, 0, 0),
    });

    const bulk = Array.from({ length: 10 }, (value, index) => index + 1);
    Promise.all(
      bulk.map(hour => {
        return fakeAppointmentsRepository.create({
          provider_id: '123',
          date: new Date(2020, 6, 29, hour + 8, 0, 0),
        });
      }),
    );

    await fakeAppointmentsRepository.create({
      provider_id: '123',
      date: new Date(2020, 6, 30, 8, 0, 0),
    });

    const availability = await listMonthAvailability.execute({
      providerId: '123',
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 28, available: true },
        { day: 29, available: false },
        { day: 30, available: true },
      ]),
    );
  });
});
