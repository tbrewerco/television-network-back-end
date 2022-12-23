import dotenv from 'dotenv';

const config = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.NODE_ENV === 'production' ? process.env.DB : process.env.DB_STAGING,
    password: process.env.PASSWORD,
    port: process.env.PORT
};

export default config;