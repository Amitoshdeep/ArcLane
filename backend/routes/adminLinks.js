import express from "express";
import Link from "../models/Link.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

// -------------------------------------
// GET ALL LINKS
// -------------------------------------
router.get("/", verifyAdmin, async (req, res) => {
  const links = await Link.find()
    .populate("categoryId")
    .sort({ section: 1, rank: 1 });
  res.json(links);
});

// -------------------------------------
// CREATE LINK (admin-only)
// -------------------------------------
router.post("/", verifyAdmin, async (req, res) => {
  const link = await Link.create(req.body);
  res.json(link);
});

// -------------------------------------
// UPDATE LINK
// -------------------------------------
router.put("/:id", verifyAdmin, async (req, res) => {
  const updated = await Link.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// -------------------------------------
// DELETE LINK
// -------------------------------------
router.delete("/:id", verifyAdmin, async (req, res) => {
  await Link.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// -------------------------------------
// APPROVE
// -------------------------------------
router.patch("/:id/approve", verifyAdmin, async (req, res) => {
  await Link.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ success: true });
});

// -------------------------------------
// REJECT
// -------------------------------------
router.patch("/:id/reject", verifyAdmin, async (req, res) => {
  await Link.findByIdAndUpdate(req.params.id, { status: "rejected" });
  res.json({ success: true });
});

export default router;
