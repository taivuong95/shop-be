import createHttpError from 'http-errors';
import User, { type IUser } from './user.model.js';
import bcrypt from 'bcrypt';

import crypto from 'crypto';
import type { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { CONSTANT } from '../../constant/common.js';
import { checkMongoErr } from '../../helpers/catchError.helper.js';

export async function registerUser(username: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const uuid = crypto.randomUUID();
  const user = new User({ username, email, password: hashedPassword, uuid });
  await user.save();
  return user;
}

export async function getUser(
  conditions: FilterQuery<IUser>,
  select: ProjectionType<IUser> = {},
  options: QueryOptions = { lean: true }
): Promise<IUser | null> {
  const query: FilterQuery<IUser> = {
    ...conditions,
    is_active: CONSTANT.ACTIVE,
    is_delete: CONSTANT.NOT_DELETE,
  };

  try {
    const user = await User.findOne(query, select, options);
    if (!user) {
      throw new createHttpError.NotFound('User not found');
    }
    return user;
  } catch (err) {
    throw checkMongoErr(err as Error);
  }
}
