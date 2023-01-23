import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '@modules/user/domain/repositories/user.repository';
import { UserRepository } from '@modules/user/infra/repositories/typeorm/user.repository';
import { ValidateAuthDto } from '../dto/validate-auth.dto';
import { generateJwtToken } from '@shared/utils/generate-jwt-token';

@Injectable()
export class GitHubAuthService {
  constructor(@Inject(UserRepository) private readonly user: IUserRepository) {}

  async createNewUser(data: ValidateAuthDto) {
    const passwordHash = await bcrypt.hash(data.id, 8);

    return await this.user.create({
      name: data.name,
      email: data.email,
      status: true,
      password: passwordHash,
      type_auth: 'github',
    });
  }

  async validate(data: ValidateAuthDto) {
    let user = await this.user.findOne({
      email: data.email,
      type_auth: 'github',
    });
    if (!user) user = await this.createNewUser(data);

    const token = generateJwtToken(user);
    const { name, email, status } = user;

    return { data: { name, email, status }, token };
  }
}
