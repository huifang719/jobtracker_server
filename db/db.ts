// import pg from 'pg'

// const db = new pg.Pool({
//     database: 'job_tracker',
//     password: '253344'
// })

// export default db;

import { Pool, PoolConfig } from "pg";

const localDbName = "job_tracker";
let db: Pool;

if (process.env.DATABASE_URL) {
  const poolConfig: PoolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };

  db = new Pool(poolConfig);
} else {
  const poolConfig: PoolConfig = process.env.DB_PASSWORD
    ? {
        database: localDbName,
        password: process.env.DB_PASSWORD,
      }
    : {
        database: localDbName,
      };

  db = new Pool(poolConfig);
}
