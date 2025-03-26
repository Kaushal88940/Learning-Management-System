import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const isAuthenticated = async (req, res, next) => {
  try {
    console.log("🔑 JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Not Loaded"); // Debugging

    // Get token from cookies or headers
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    console.log("📌 Token from Cookie/Header:", token);

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "Internal Server Error: Missing JWT_SECRET" });
    }

    if (!token) {
      return res.status(401).json({ message: "User not authenticated", success: false });
    }

    // Verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🛠️ Decoded Token:", decode);

    if (!decode || !decode.id) {
      return res.status(401).json({ message: "Invalid token payload", success: false });
    }

    req.id = decode.id.toString(); // Attach user data to request
    next();
  } catch (error) {
    console.error("❌ Authentication Error:", error);
    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};

export default isAuthenticated;
