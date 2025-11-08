import jwt from "jsonwebtoken";

export function adminAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const verify = jwt.verify(token, "SECRET123");
    req.admin = verify;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
}
