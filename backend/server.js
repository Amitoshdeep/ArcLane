import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import categoryRoutes from "./routes/categoryRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/links", linkRoutes);

app.get("/", (req, res) => {
  res.send("ArcLane Backend Running");
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
