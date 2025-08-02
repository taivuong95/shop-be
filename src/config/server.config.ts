import * as dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.APP_PORT || 8000,
  accessTokenPrivateKey: process.env.APP_SECRET,
  refreshTokenPrivateKey: process.env.APP_SECRET + 'refresh',
};
