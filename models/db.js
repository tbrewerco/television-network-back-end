import pg from 'pg'
const { Client } = pg
import dbConfig from '../config/dbConfig.js';

const client = new Client(dbConfig);
export default client;