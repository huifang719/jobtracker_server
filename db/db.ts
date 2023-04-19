// import pg from 'pg'

// const db = new pg.Pool({
//     database: 'job_tracker',
//     password: '1111'
// })

// export default db;

import pg from 'pg'
const localDbName = 'job_tracker'

let db;
if (process.env.DATABASE_URL) {
  db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
  if (process.env.DB_PASSWORD) {
    db = new pg.Pool({
      database: localDbName,
      password: process.env.DB_PASSWORD
    })
  } else {
    db = new pg.Pool({
      database: localDbName
    })
  }
}

export default db;