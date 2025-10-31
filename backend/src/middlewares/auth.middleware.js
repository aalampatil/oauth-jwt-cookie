import jwt from "jsonwebtoken";
import { authUserModel } from "../models/authenticated.user.model.js";

export const verifyJWT = async (req, res, next) => {
    //console.log(req.cookies?.accessToken);
    
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
      
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized request" });
    }

    // ✅ verify using correct secret
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await authUserModel
      .findById(decodedToken._id)
      .select("-password -refreshToken");
      
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid access token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
