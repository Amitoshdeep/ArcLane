import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// Add category
router.post("/", async (req, res) => {
  try {
    const cat = await Category.create(req.body);
    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

export default router;
