const pg = require('pg')

const db = new pg.Pool({
    database: 'job_tracker',
    password: '1111'
})

module.exports = db 