const Pool = require('pg').Pool;
import dbConfig from '../config/dbConfig.js';

export const pool = new Pool(dbConfig);