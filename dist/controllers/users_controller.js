import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
const router = express.Router();
router.post("/", (req, res) => {
    const { name, email, password } = req.body;
    const passwordDigest = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    User.findByEmail(email).then((user) => {
        if (user) {
            res
                .status(400)
                .send({ error: "This email is already associated with an account!" });
        }
        else {
            User.create(name, email, passwordDigest).then((email) => res.json(email));
        }
    });
});
export default router;
