

import postgres from "postgres";
import log from "../logger";
let username = process.env.DB_USER;
let password = process.env.DB_PASS;
let host = process.env.DB_HOST;
let database = process.env.DB_NAME;

var DBConfig = {
  username: username,
  password: password,
  host: host,
  database: database,
};

const sqlDB = postgres(DBConfig);

const Init = async () => {
  try {
    await sqlDB`CREATE TABLE IF NOT EXISTS users (    
      user_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
    ,date_created DATE,api_key VARCHAR NOT NULL,is_active Boolean)`;

    await sqlDB`CREATE TABLE IF NOT EXISTS bills (    
      bill_id SERIAL PRIMARY KEY,
      month INTEGER,
      num_of_calls INTEGER,
      date_created DATE,user_id INTEGER,is_active Boolean,paid Boolean default false,amount Decimal(18,5),
        CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
      
      )`;
  } catch (er: any) {
    log.error(er);
  }
};
Init();
export default sqlDB;
