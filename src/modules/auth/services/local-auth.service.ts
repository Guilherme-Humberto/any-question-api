import * as bcrypt from 'bcrypt';
import { generateJwtToken } from '@shared/utils/generate-jwt-token';
import { UserRepository } from '@modules/user/infra/repositories/typeorm/user.repository';
import { IUserRepository } from '../../user/domain/repositories/user.repository';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  LoginUserOutPut,
  SessionUserDto,
} from '../../user/dto/session-user.dto';

@Injectable()
export class LocalAuthService {
  constructor(
    @Inject(UserRepository)
    private readonly user: IUserRepository,
  ) {}

  public async execute(data: SessionUserDto): Promise<LoginUserOutPut> {
    const user = await this.user.findOne({ email: data.email });
    if (!user) throw new NotFoundException('User not found');

    const comparePasswords = await bcrypt.compare(data.password, user.password);
    if (!comparePasswords) throw new BadRequestException('invalid password');

    const { id, name, email, status } = user;

    const token = generateJwtToken(user);

    return { user: { id, name, email, status }, token };
  }
}
