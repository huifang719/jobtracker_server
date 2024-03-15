import db from "../db/db.js";
const SavedJob = {
    create: (title, description, location, url, email, company) => {
        const sql = `
      INSERT INTO jobs(title, description, location, url, email, company)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
        return db
            .query(sql, [title, description, location, url, email, company])
            .then((dbRes) => dbRes.rows[0]);
    },
    findAll: (email) => {
        const sql = "SELECT * FROM jobs WHERE email = $1";
        return db.query(sql, [email]).then((dbRes) => dbRes.rows);
    },
    findJob: (email, description) => {
        const sql = `
    SELECT * FROM jobs
    WHERE email = $1 AND description = $2
  `;
        return db.query(sql, [email, description]).then((dbRes) => dbRes.rows[0]);
    },
    delete: (description) => {
        const sql = `
      DELETE FROM jobs WHERE description = $1
    `;
        return db.query(sql, [description]);
    },
};
export default SavedJob;
