import jwt from 'jsonwebtoken';
import type { IJwtData, IUser } from '../modules/user/user.model.js';

export interface IJWTPayload {
 user : IJwtData;
}

interface IVerifyResult {
  valid: boolean;
  expired: boolean;
  decoded: IJWTPayload | null;
}

export function generateToken(
  payload: IJWTPayload,
  secretOrPublicKey: string,
  options?: jwt.SignOptions | undefined
): string {
  const token = jwt.sign(payload, secretOrPublicKey, {
    ...(options && options),
  });
  return token;
}

export const verifyToken = (token: string, secretOrPublicKey: string): IVerifyResult  => {
  try {
    const decoded = jwt.verify(token, secretOrPublicKey) as IJWTPayload;
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    const err = error as jwt.JsonWebTokenError;

    return {
      valid: false,
      expired: err.message === 'jwt expired',
      decoded: null,
    };
  }
};
