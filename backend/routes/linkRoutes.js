import express from "express";
import Link from "../models/Link.js";

const router = express.Router();

// Add link (pending)
router.post("/", async (req, res) => {
  try {
    const link = await Link.create(req.body);
    res.json(link);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all approved links
router.get("/", async (req, res) => {
  const links = await Link.find({ status: "approved" });
  res.json(links);
});

// Approve link
router.patch("/:id/approve", async (req, res) => {
  const link = await Link.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );
  res.json(link);
});

// Reject link
router.patch("/:id/reject", async (req, res) => {
  const link = await Link.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  );
  res.json(link);
});

export default router;
