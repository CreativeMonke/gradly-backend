import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  // Only for debug
  const devBypass = req.header("dev-bypass");
  /// 
  if (!token && devBypass !== "aia zic 123") {
    return res.status(401).json({
      message: "Access Denied. No token provided.",
      status: "error",
      data: null,
    });
  }

  try {
    ///Only for debug
    if (devBypass === "aia zic 123") {
      // Simulate a decoded user object for development bypass
      req.user = {
        // You can customize this object based on your needs
        userId: "dev_bypass_user",
        role: "developer",
        // Add other relevant user information
      };
      return next(); // Proceed without JWT verification
    }
    ///


    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user info to `req.user`
    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid or expired token.",
      status: "error",
      data: null,
    });
  }
};
