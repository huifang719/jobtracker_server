import db from '../db/db';

const User = {
  create: (name:string, email:string, passwordDigest:string) => {
    const sql = `
      INSERT INTO users(name, email, password_digest)
      VALUES ($1, $2, $3)
      RETURNING *
    `

    return db
      .query(sql, [name, email, passwordDigest])
      .then(dbRes => dbRes.rows[0].email)
  },

  findByEmail: (email:string) => {
    const sql = `
      SELECT * FROM users
      WHERE email = $1
    `

    return db
      .query(sql, [email])
      .then(dbRes => dbRes.rows[0])
  },

  findById: (id:number) => {
    const sql = `
      SELECT * FROM users
      WHERE id = $1
    `

    return db
      .query(sql, [id])
      .then(dbRes => dbRes.rows[0].email)
  }
}

export default User;