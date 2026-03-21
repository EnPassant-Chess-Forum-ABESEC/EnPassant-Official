import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user)
      return res.status(401).message({ message: "user not found" });

    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized as admin" });

    next();
  } catch (err) {
    console.error("Admin auth error");
    res.status(500).json({ message: "Admin auth error", err });
  }
};
