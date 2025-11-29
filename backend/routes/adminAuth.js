import express from "express";
import dotenv from "dotenv";
import cookie from "cookie";

dotenv.config();

const router = express.Router();

// LOGIN
router.post("/login", (req, res) => {
  const { password } = req.body;

  console.log("Incoming PW:", password);
  console.log("Admin PW:", process.env.ADMIN_PASSWORD);

  if (!password) return res.status(400).json({ success: false });

  if (password === process.env.ADMIN_PASSWORD) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("admin_session", "yes", {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 3, // 3 days
      })
    );

    return res.json({ success: true });
  }

  return res.status(401).json({ success: false });
});

// CHECK ADMIN SESSION
router.get("/me", (req, res) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  if (cookies.admin_session === "yes") {
    return res.json({ admin: true });
  }
  res.json({ admin: false });
});

router.get("/logout", (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("admin_session", "", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    })
  );

  res.json({ success: true });
});


export default router;
