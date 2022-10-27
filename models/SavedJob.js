const db = require('../db/db')

const SavedJob = {
  create: (title, description, location, url, email) => {
    const sql = `
      INSERT INTO jobs(title, description, location, url, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `

    return db
      .query(sql, [title, description, location, url, email])
      .then(dbRes =>dbRes.rows[0].title)
  }
}

module.exports = SavedJob