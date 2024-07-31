import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { configDotenv } from 'dotenv';

export const getSequalizeConfig = () => {
    configDotenv();
    const sequelizeConfig: SequelizeModuleOptions = {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadModels: true,
        synchronize: true,  // Set to false in production
      };
    return sequelizeConfig
}
