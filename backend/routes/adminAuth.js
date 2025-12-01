import express from "express";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const router = express.Router();

// ----------------------------------------
// LOGIN (email + password)
// ----------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, error: "Missing fields" });

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ success: false, error: "Invalid login" });

    const match = await admin.comparePassword(password);
    if (!match)
      return res.status(401).json({ success: false, error: "Invalid login" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("admin_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    );

    return res.json({ success: true });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});


// CHECK ADMIN SESSION
router.get("/me", (req, res) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.admin_token;

    if (!token) return res.json({ admin: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === "admin")
      return res.json({ admin: true });

    return res.json({ admin: false });

  } catch (err) {
    return res.json({ admin: false });
  }
});


// ----------------------------------------
// LOGOUT
// ----------------------------------------
router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("admin_token", "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    })
  );

  res.json({ success: true });
});


export default router;
