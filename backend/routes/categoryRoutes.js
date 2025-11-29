// backend/routes/categoryRoutes.js
import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// --------------------
// PUBLIC: Add category (goes to PENDING)
// --------------------
router.post("/", async (req, res) => {
  try {
    const cat = await Category.create({
      name: req.body.name,
      icon: req.body.icon,
      status: "pending"   // <---- IMPORTANT!
    });

    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------
// PUBLIC: get only APPROVED categories
// --------------------
router.get("/", async (req, res) => {
  const approved = await Category.find({ status: "approved" });
  res.json(approved);
});

// --------------------
// ADMIN: get pending categories
// --------------------
router.get("/pending", async (req, res) => {
  const pending = await Category.find({ status: "pending" });
  res.json(pending);
});

// --------------------
// ADMIN: approve category
// --------------------
router.post("/approve/:id", async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ success: true });
});

// --------------------
// ADMIN: reject category
// --------------------
router.post("/reject/:id", async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, { status: "rejected" });
  res.json({ success: true });
});

export default router;
