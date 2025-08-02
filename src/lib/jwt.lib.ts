import jwt from 'jsonwebtoken';
import type { IJwtData, IUser } from '../modules/user/user.model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export interface IJWTPayload {
 user : IJwtData;
}

interface IVerifyResult {
  valid: boolean;
  expired: boolean;
  decoded: IJWTPayload | null;
}

// export const generateToken = (user: IUser): string => {
//   const payload: IJWTPayload = {
//     userId: (user._id as any).toString(),
//     email: user.email,
//     username: user.username,
//   };

//   return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
// };

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

// export const decodeToken = (token: string): JWTPayload | null => {
//   try {
//     return jwt.verify(token, JWT_SECRET) as JWTPayload;
//   } catch (error) {
//     return null;
//   }
// };
