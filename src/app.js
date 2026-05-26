import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "./middlewares/errorMiddleware.middleware.js";
import transactionsRoutes from "./routes/transactions.routes.js";
import usersRoutes from "./routes/users.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "API works" });
});

app.use("/transactions", transactionsRoutes);
app.use("/auth", usersRoutes);
app.use("/analytics", analyticsRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
