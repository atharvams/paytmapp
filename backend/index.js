import express from "express";
import { router } from "./api/index.js";
import { userRouter } from "./api/user.js";

import cors from "cors";
import "dotenv/config";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  console.log("App is online!");
  res.json({
    message: "App is online!",
  });
});

app.listen(3000, () => {
  console.log("App is listening to port 3000");
});
