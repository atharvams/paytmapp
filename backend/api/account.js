import { Router } from "express";

export const accountRouter = Router();

accountRouter.get("/", (req, res) => {
  console.log("Hello from account");
  res.json({
    message: "Hello from account!",
  });
});
