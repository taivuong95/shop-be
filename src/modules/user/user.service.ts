import createHttpError from 'http-errors';
import User, { type IUser } from './user.model.js';
import bcrypt from 'bcrypt';

import crypto from 'crypto';
import type { FilterQuery, ProjectionType, QueryOptions, UpdateQuery, MongooseUpdateQueryOptions } from 'mongoose';
import { CONSTANT } from '../../constant/common.js';
import { checkMongoErr } from '../../helpers/catchError.helper.js';
import { hashPassword } from '../../lib/bcript.lib.js';

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

export async function getUsers(
  conditions: FilterQuery<IUser>,
  select: ProjectionType<IUser>,
  options: QueryOptions = { lean: true }
): Promise<IUser[]> {
  const query: FilterQuery<IUser> = {
    ...conditions,
    is_delete: CONSTANT.NOT_DELETE,
  };

  try {
    const users = await User.find(query, select, options);
    return users || [];
  } catch (err) {
    throw checkMongoErr(err as Error);
  }
}

export async function countUser(
  conditions: FilterQuery<IUser>
): Promise<number> {
  const query: FilterQuery<IUser> = {
    ...conditions,
    is_delete: CONSTANT.NOT_DELETE,
  };

  try {
    const result = await User.countDocuments(query);
    return result || 0;
  } catch (err) {
    throw checkMongoErr(err as Error);
  }
}

export async function createUser(input: IUser): Promise<IUser> {
  try {
    input.password = hashPassword(input.password || '');
    const newUser = await User.create(input);
    return newUser;
  } catch (err) {
    throw checkMongoErr(err as Error);
  }
}

export async function updateUser(
  userUuid: string,
  input: UpdateQuery<IUser>,
  options: MongooseUpdateQueryOptions = {}
): Promise<number> {
  try {
    const result = await User.updateOne(
      { uuid: userUuid, is_delete: CONSTANT.NOT_DELETE },
      input,
      options
    );
    if (result.matchedCount == 0) {
      throw new createHttpError.NotFound('user not found');
    }

    return result.modifiedCount;
  } catch (err) {
    throw checkMongoErr(err as Error);
  }
}

export async function updateUsers(
  conditions: FilterQuery<IUser>,
  input: UpdateQuery<IUser>,
  options: MongooseUpdateQueryOptions = {}
): Promise<number> {
  try {
    const result = await User.updateMany(
      { ...conditions, is_delete: CONSTANT.NOT_DELETE },
      input,
      options
    );

    return result.modifiedCount;
  } catch (err) {
    throw checkMongoErr(err as Error);
  }
}

export async function findOne(
  conditions: FilterQuery<IUser>,
  select: ProjectionType<IUser> = {},
  options: QueryOptions = { lean: true }
): Promise<IUser | null> {
  const query: FilterQuery<IUser> = {
    ...conditions,
    is_delete: CONSTANT.NOT_DELETE,
  };

  try {
    return User.findOne(query, select, options);

  } catch (err) {
    throw checkMongoErr(err as Error);
  }
}