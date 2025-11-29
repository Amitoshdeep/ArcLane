import express from "express";
import Link from "../models/Link.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const link = await Link.create(req.body);
    res.json(link);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const { categoryId, search, status = "approved" } = req.query;

  let filter = { status };

  if (categoryId) filter.categoryId = categoryId;
  if (search) {
    filter.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
      { tags: new RegExp(search, "i") }
    ];
  }

  const links = await Link.find(filter)
    .populate("categoryId")
    .sort({ section: 1, rank: 1 });

  res.json(links);
});

router.patch("/:id/approve", async (req, res) => {
  res.json(
    await Link.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true })
  );
});

router.patch("/:id/reject", async (req, res) => {
  res.json(
    await Link.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true })
  );
});

export default router;
