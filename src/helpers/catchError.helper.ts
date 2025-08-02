import { MongoError } from 'mongodb';
import createError, { HttpError } from 'http-errors';

export function checkMongoErr(err: Error | HttpError): HttpError {
  if ((err as HttpError).status) {
    return err as HttpError;
  }

  switch (true) {
    case err.name === 'DocumentNotFoundError':
      return new createError.NotFound('Resource not found');
    case err.name === 'MongoError' && (err as MongoError).code === 11000:
      return new createError.Conflict('Duplicated');
    default:
      return new createError.InternalServerError(err.message);
  }
}
