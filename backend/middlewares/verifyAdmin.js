import jwt from "jsonwebtoken";
import cookie from "cookie";

export function verifyAdmin(req, res, next) {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.admin_token;

    if (!token)
      return res.status(401).json({ error: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin")
      return res.status(401).json({ error: "Not authorized" });

    req.adminId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Not authorized" });
  }
}
