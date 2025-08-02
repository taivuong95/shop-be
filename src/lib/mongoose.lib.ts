import mongoose from 'mongoose';
import config from '../config/config.js';

function connect() {
  return mongoose.connect(
    `${config.Database.MongoUri}/${config.Database.MongoDbName}`,
    {
      retryWrites: true,
      w: 'majority',
      authSource: 'admin',
      maxPoolSize: 50,
      minPoolSize: 10,
    }
  );
}

export default {
  connect,
};
