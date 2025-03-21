import { Router } from "express";
import z, { string } from "zod";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { account, user } from "../db.js";
import middleware from "../middleware.js";

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

const updateUserSchema = z.object({
  password: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});

const jwtSecret = process.env.JWT_SECRET;

userRouter.get("/", (req, res) => {
  console.log("hello this is bootstrapped app.");
  res.json({
    message: "hello this is bootstrapped app",
  });
});

userRouter.post("/signup", async (req, res) => {
  const verified = userSignupSchema.safeParse(req.body);

  if (!verified.success) {
    return res.status(411).json({
      message: "Incorrect cred!",
      error: verified.error.format(),
    });
  }

  try {
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

    await account.create({
      userId: userId,
      amount: Math.round((1 + Math.random() * 10000) * 1000) / 1000,
    });

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
  } catch (error) {
    console.log("Signup error: ", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const signInSchemaVerification = userSignSchema.safeParse(req.body);

  if (!signInSchemaVerification.success) {
    return res.status(411).json({
      message: "Invalid credentials!",
      error: signInSchemaVerification.error.format(),
    });
  }
  try {
    const userFound = await user.findOne({
      username: req.body.username,
    });

    if (!userFound) {
      return res.status(411).json({
        message: "Error while logging in!",
      });
    }

    if (userFound.password != req.body.password) {
      return res.status(401).json({
        message: "Wrong cred!",
      });
    }
    const jwtToken = jwt.sign({ id: userFound._id }, jwtSecret);

    return res.status(200).json({
      token: jwtToken,
    });
  } catch (error) {
    console.log("signin error: ", error);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
});

userRouter.put("/", middleware, async (req, res) => {
  const { success } = updateUserSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Insufficient info.",
    });
  }

  await user.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );

  res.json({
    message: "Updated successfully",
  });
});

userRouter.get("/bulk", middleware, async (req, res) => {
  const queryParam = req.query.filter || "";
  const filter = ".*" + queryParam + ".*";

  try {
    const users = await user.find({
      $or: [
        {
          username: { $regex: filter, $options: "i" },
        },
        {
          lastname: { $regex: filter, $options: "i" },
        },
        {
          firstname: { $regex: filter, $options: "i" },
        },
      ],
    });

    return res.json({
      users: users.map((user) => ({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user._id,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Search error!",
    });
  }
});

userRouter.get("/me", middleware, async (req, res) => {
  const userId = req.userId;
  try {
    const existingUser = await user.findOne({
      _id: userId,
    });

    if (!existingUser) {
      return res.json({ message: "No user found" });
    }
    console.log(existingUser);

    return res.json({
      id: existingUser._id,
      username: existingUser.username,
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
    });
  } catch (error) {
    res
      .json({
        message: "Internal server error",
      })
      .status(500);
  }
});
