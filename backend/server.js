import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import categoryRoutes from "./routes/categoryRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import adminAuth from "./routes/adminAuth.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: ["https://arc-lane.vercel.app"],  // your frontend domain
  credentials: true
}));

app.use(express.json());

// connect db
connectDB();

// routes
app.use("/api/categories", categoryRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/admin", adminAuth);

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", service: "Arclane Backend" });
});
