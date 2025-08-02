import databaseConfig from './database.config.js';
import serverConfig from './server.config.js';

export default {
  Database: { ...databaseConfig },
  Server: { ...serverConfig },
};
