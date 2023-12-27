import express, { Request, Response } from "express";
import { SessionData } from "express-session";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import UserDto from "../dto/UserDto.js";

const router = express.Router();

interface CustomSessionData extends SessionData {
  userId?: number;
}
interface User {
  email: string;
  password_digest: string;
  name: string;
  id: number;
}
router.get("/", (req: Request, res: Response) => {
  const customSessionData: CustomSessionData = req.session as CustomSessionData;
  if (customSessionData.userId) {
    User.findById(customSessionData.userId).then((email: string) =>
      res.json(email)
    );
  } else {
    res.json({ error: "no logged in user" });
  }
});

router.post("/", (req: Request, res: Response) => {
  const { email, password } = req.body as UserDto;

  User.findByEmail(email).then((user: User) => {
    const isValidPassword = bcrypt.compareSync(password, user.password_digest);
    if (user && isValidPassword) {
      const customSessionData: CustomSessionData =
        req.session as CustomSessionData;
      customSessionData.userId = user.id;
      res.json(email);
    } else {
      res.status(400).send({ error: "Incorrect email or/and password" });
    }
  });
});

router.delete("/", (req: Request, res: Response) => {
  const customSessionData: CustomSessionData = req.session as CustomSessionData;
  if (!customSessionData.userId) {
    return res.status(400).send({ error: "No user logged in" });
  }

  req.session.destroy((err: any) => {
    if (err) {
      return res.status(500).send({ error: "Error destroying session" });
    }
    return res.clearCookie("session"); // optional: clears the session cookie from the client
  });
});

export default router;
