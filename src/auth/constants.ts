require('dotenv').config();

export const jwtConstants = {
    secret: process.env.SECRET_ADMIN,
    secret_refresh: process.env.REFRESH_SECRET_ADMIN,
    expire_secret: '1d',
    expire_secret_refresh: '7d',

    secret_supplier: process.env.SECRET_SUPPLIER,
    secret_refresh_supplier: process.env.REFRESH_SECRET_SUPPLIER,

    secret_agent: process.env.SECRET_AGENT,
    secret_refresh_agent: process.env.REFRESH_SECRET_AGENT,
};