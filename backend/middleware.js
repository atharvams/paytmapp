import "dotenv/config";
import jwt from "jsonwebtoken";

function middleware(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Unauthorized! Bad cred!",
    });
  }

  const token = authToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "server error!",
    });
  }
}

export default middleware;
