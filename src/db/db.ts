// import pg from 'pg'

// const db = new pg.Pool({
//     database: 'job_tracker',
//     password: '253344'
// })

// export default db;

import pg from "pg";

const localDbName = "job_tracker";
let db: pg.Pool;

if (process.env.DATABASE_URL) {
  const poolConfig: pg.PoolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  };

  db = new pg.Pool(poolConfig);
} else {
  const poolConfig: pg.PoolConfig = process.env.DB_PASSWORD
    ? {
        database: localDbName,
        password: process.env.DB_PASSWORD,
      }
    : {
        database: localDbName,
      };

  db = new pg.Pool(poolConfig);
}

export default db;
