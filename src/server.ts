import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";

import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
import { errorHandler } from "./error handlers/errors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", protect, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

// Error handler (basically a middleware)
// Comes in the end bc if an error is thrown after the middleware runs, it won't catch
app.use(errorHandler)
export default app;
