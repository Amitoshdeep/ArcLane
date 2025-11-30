import express from "express";
import Link from "../models/Link.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

/* -----------------------------------
   PUBLIC: Add a link (SUBMIT page)
----------------------------------- */
router.post("/", async (req, res) => {
  try {
    const link = await Link.create(req.body);
    res.json(link);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -----------------------------------
   PUBLIC: Get approved links only
   ADMIN:  Get pending/rejected
----------------------------------- */
router.get("/", async (req, res) => {
  const { categoryId, search, status = "approved" } = req.query;

  // 🛡 If user wants pending links → admin only
  if (status !== "approved") {
    const cookie = req.headers.cookie || "";
    if (!cookie.includes("admin_session=yes")) {
      return res.status(401).json({ error: "Not authorized" });
    }
  }

  let filter = { status };

  if (categoryId) filter.categoryId = categoryId;
  if (search) {
    filter.$or = [
      { title: new RegExp(search, "i") },
      { description: new RegExp(search, "i") },
      { tags: new RegExp(search, "i") },
    ];
  }

  const links = await Link.find(filter)
    .populate("categoryId")
    .sort({ section: 1, rank: 1 });

  res.json(links);
});

/* -----------------------------------
   ADMIN ONLY: Approve a link
----------------------------------- */
router.patch("/:id/approve", verifyAdmin, async (req, res) => {
  const updated = await Link.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );
  res.json(updated);
});

/* -----------------------------------
   ADMIN ONLY: Reject a link
----------------------------------- */
router.patch("/:id/reject", verifyAdmin, async (req, res) => {
  const updated = await Link.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  );
  res.json(updated);
});

export default router;
