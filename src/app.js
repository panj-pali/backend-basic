import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { asyncHandler } from "./utils/asyncHandler.js";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.get("/test", asyncHandler(async (req, res) => {

    // jaan-bujhkar error
    throw new Error("Something went wrong");

}));

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({
    limit: "50mb",
    extended: true
}));

app.use(express.static("public"));

app.use(cookieParser());

// ROUTES
app.use("/api/v1/users", userRouter);

export default app;