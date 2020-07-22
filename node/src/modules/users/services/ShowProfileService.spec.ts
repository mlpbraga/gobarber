import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      userId: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@email.com');
  });

  it('should not be able to show profile with a non-existing user', async () => {
    await expect(
      showProfile.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
