import { Router } from "express";
import z, { string } from "zod";
// import user from './db'
import jwt from "jsonwebtoken";
import "dotenv/config";
import { user } from "../db.js";

export const userRouter = Router();

const userSignupSchema = z.object({
  username: z.string().email().min(3).max(30),
  password: z.string().min(4),
  firstname: z.string().min(4),
  lastname: z.string().min(4),
});

const userSignSchema = z.object({
  username: z.string().email().min(3).max(30),
  password: z.string().min(4),
});

const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret);

userRouter.get("/", (req, res) => {
  console.log("hello this is bootstrapped app.");
  res.json({
    message: "hello this is bootstrapped app",
  });
});

userRouter.post("/signup", async (req, res) => {
  const verified = userSignupSchema.safeParse(req.body);

  if (!verified) {
    return res.status(411).json({
      message: "Incorrect cred!",
    });
  }

  const userAlreadyExists = await user.findOne({
    username: req.body.username,
  });

  if (userAlreadyExists) {
    return res.status(401).json({
      message: "User already exists! please sign in!",
    });
  }

  const newUser = await user.create({
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });

  const userId = newUser._id;

  const jwtToken = jwt.sign(
    {
      id: userId,
    },
    jwtSecret
  );

  return res.status(200).json({
    message: "User created successfully!",
    token: jwtToken,
  });
});

userRouter.post("/signin", async (req, res) => {
  const signInSchemaVerification = userSignSchema.safeParse(req.body);

  if (!signInSchemaVerification.success) {
    return res.status(411).json({
      message: "Invalid credentials!",
    });
  }

  const userFound = await user.findOne({
    username: req.body.username,
  });

  if (!userFound) {
    return res.status(411).json({
      message: "Error while logging in!",
    });
  }

  const jwtToken = jwt.sign({ id: userFound._id }, jwtSecret);

  return res.status(200).json({
    token: jwtToken,
  });
});
