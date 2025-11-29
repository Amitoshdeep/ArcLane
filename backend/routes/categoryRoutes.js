import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const cat = await Category.create(req.body);
    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  res.json(await Category.find());
});

export default router;
