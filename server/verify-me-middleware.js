import APIError from "./error.js";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return next(APIError.Forbidden("No token provided"));

  const token = authHeader.split(" ")[1];
  if (!token) return next(APIError.Forbidden("No token provided"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return next(APIError.Forbidden("Invalid token"));
  }
};

export default verifyToken;
