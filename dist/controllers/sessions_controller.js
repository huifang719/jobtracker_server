import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
const router = express.Router();
router.get("/", (req, res) => {
    const customSessionData = req.session;
    if (customSessionData.userId) {
        User.findById(customSessionData.userId).then((email) => res.json(email));
    }
    else {
        res.json({ error: "no logged in user" });
    }
});
router.post("/", (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email).then((user) => {
        const isValidPassword = bcrypt.compareSync(password, user.password_digest);
        if (user && isValidPassword) {
            const customSessionData = req.session;
            customSessionData.userId = user.id;
            res.json(email);
        }
        else {
            res.status(400).send({ error: "Incorrect email or/and password" });
        }
    });
});
router.delete("/", (req, res) => {
    const customSessionData = req.session;
    if (!customSessionData.userId) {
        return res.status(400).send({ error: "No user logged in" });
    }
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ error: "Error destroying session" });
        }
        return res.clearCookie("session"); // optional: clears the session cookie from the client
    });
});
export default router;
