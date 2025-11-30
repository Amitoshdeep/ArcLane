import cookie from "cookie";

export function verifyAdmin(req, res, next) {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");

    if (cookies.admin_session === "yes") {
      return next();
    }

    return res.status(401).json({ error: "Not authorized" });
  } catch (err) {
    return res.status(401).json({ error: "Not authorized" });
  }
}
