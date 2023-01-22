import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { PassportSerializer } from '@nestjs/passport';

export class SerializerAuth extends PassportSerializer {
  serializeUser(user: UserEntity, done: Function) {
    done(null, user);
  }

  deserializeUser(payload: any, done: Function) {
    done(null, payload);
  }
}
