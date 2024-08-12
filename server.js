import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import morgan from "morgan";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import attendanceRouter from "./routers/attendanceRouter.js";
import reportRouter from "./routers/reportRouter.js";
import notificationRouter from "./routers/notificationRouter.js";
import integrationRouter from "./routers/integrationRouter.js";
import adminRouter from "./routers/adminRouter.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

if (process.env.NODE_ENV === "netcrawlerdev") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", authRouter);

app.use("/api/admin/", adminRouter);

app.use("/api/user/", userRouter);

app.use("/api/attendance/", attendanceRouter);

app.use("/api/report/", reportRouter);

app.use("/api/notifications/", notificationRouter);

app.use("/api/integration/", integrationRouter);

const PORT = process.env.PORT || 5000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("=========================");
  console.log("Connected To MONGODB ....");
  console.log("=========================");
  app.listen(PORT, () => {
    console.log("server running on port 5000 ....");
  });
} catch (error) {
  console.log(error);
}
