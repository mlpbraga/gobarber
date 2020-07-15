import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import User from '../infra/typeorm/entities/Users';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findByEmail(id: string): Promise<User | undefined>;
  findById(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
