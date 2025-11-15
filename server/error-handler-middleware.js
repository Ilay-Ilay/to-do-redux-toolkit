import APIError from "./error.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log(err.message || err);
  res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
