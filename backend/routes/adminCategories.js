import express from "express";
import Category from "../models/Category.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

// -------------------------------------
// GET ALL CATEGORIES (approved + pending + rejected)
// -------------------------------------
router.get("/", verifyAdmin, async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

// -------------------------------------
// CREATE CATEGORY (admin-only)
// -------------------------------------
router.post("/", verifyAdmin, async (req, res) => {
  const cat = await Category.create({
    name: req.body.name,
    icon: req.body.icon,
    status: req.body.status || "approved",
  });
  res.json(cat);
});

// -------------------------------------
// UPDATE CATEGORY
// -------------------------------------
router.put("/:id", verifyAdmin, async (req, res) => {
  const updated = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// -------------------------------------
// DELETE CATEGORY
// -------------------------------------
router.delete("/:id", verifyAdmin, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// -------------------------------------
// APPROVE
// -------------------------------------
router.patch("/:id/approve", verifyAdmin, async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ success: true });
});

// -------------------------------------
// REJECT
// -------------------------------------
router.patch("/:id/reject", verifyAdmin, async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, { status: "rejected" });
  res.json({ success: true });
});

export default router;
