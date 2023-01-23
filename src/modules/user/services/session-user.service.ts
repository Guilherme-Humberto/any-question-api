import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '../domain/repositories/user.repository';
import { LoginUserOutPut, SessionUserDto } from '../dto/session-user.dto';
import { UserRepository } from '../infra/repositories/typeorm/user.repository';

@Injectable()
export class SessionUserService {
  constructor(@Inject(UserRepository) private readonly user: IUserRepository) {}

  public async execute(data: SessionUserDto): Promise<LoginUserOutPut> {
    const user = await this.user.findOne({ email: data.email });
    if (!user) throw new NotFoundException('User not found');

    const comparePasswords = await bcrypt.compare(data.password, user.password);
    if (!comparePasswords) throw new BadRequestException('invalid password');

    const token = this.user.session(user);
    const { name, email, status } = user;

    return { user: { name, email, status }, token };
  }
}
