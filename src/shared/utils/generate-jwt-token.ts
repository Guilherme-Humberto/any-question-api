import { sign } from 'jsonwebtoken';
import { Envs } from '@shared/envs/envs';

export const generateJwtToken = (data) => {
  const secret = Envs.SECRET_TOKEN;
  const expiration = Envs.EXPIRATION_TOKEN;

  const payload = {
    id: data.id,
    email: data.email,
  };

  const options = {
    expiresIn: expiration,
    subject: String(data.id),
  };

  return sign(payload, secret, options);
};
