import pg from 'pg'

const db = new pg.Pool({
    database: 'job_tracker',
    password: '1111'
})

export default db;