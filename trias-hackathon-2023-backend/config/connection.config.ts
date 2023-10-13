
const dbConfig = require('../config/db.config');

import { Sequelize } from "sequelize-typescript";

export let db_multi_instance: Sequelize;

export async function sequelizeConnect() {

  const sequelize = new Sequelize({
    database: dbConfig.DB,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
    port: 3306,
    repositoryMode: true,
    retry: {
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ETIMEDOUT/,
        /ESOCKETTIMEDOUT/,
        /EHOSTUNREACH/,
        /EPIPE/,
        /EAI_AGAIN/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
        /SequelizeConnectionAcquireTimeoutError/,
        /SequelizeDatabaseError/,
      ],
      max: 2,
    },
    dialect: "mysql",
    pool: {
      max: 5,
      min: 1,
      acquire: 15000,
      idle: 10000,
    },
    define: {
      underscored: false,
    },
    timezone: "+00:00",
    logging: false,
  } as any);
  await sequelize.authenticate();
  await sequelize.sync();

  db_multi_instance = sequelize;
}



