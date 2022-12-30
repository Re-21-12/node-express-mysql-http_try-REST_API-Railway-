//crear un conjunto de conecciones

import { createPool } from "mysql2/promise";

import {
  DB_HOST,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from './config.js'

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE,
});
// Tanto usuario como host tienen sus propias variables de entorno