require('dotenv').config();
import { DataSource, DataSourceOptions } from "typeorm";
import { addTransactionalDataSource, initializeTransactionalContext } from 'typeorm-transactional';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'postgres',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*.js'],
    // useUTC: true,
    // debug: process.env.DEBUG === 'true' ? true : false,
    // synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
    // synchronize: true
}
const dataSource = new DataSource(dataSourceOptions);

initializeTransactionalContext();
addTransactionalDataSource(dataSource);

export default dataSource