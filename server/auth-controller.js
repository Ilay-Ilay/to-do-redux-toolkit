import { User } from "./db.js";
import APIError from "./error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
};

class AuthController {
  static me = async (req, res, next) => {
    try {
      const dbUser = await User.findOne({ where: { id: req.userId } });
      if (!dbUser) throw APIError.NotFound("User not found");

      const user = dbUser.toJSON();
      delete user.password;

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };

  static register = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) throw APIError.BadRequest("Email already in use");
      const hashedPassword = await bcrypt.hash(password, 8);
      const user = await User.create({ email, password: hashedPassword });
      const token = signToken(user.id);
      const protectedUser = user.toJSON();
      delete protectedUser.password;
      res.status(201).json({
        message: "Registration successfull",
        token,
        user: protectedUser,
      });
    } catch (error) {
      next(error);
    }
  };
  static login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("LOGIN ATTEMPT");
    console.log(password);
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) throw APIError.BadRequest("Invalid email");
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) throw APIError.BadRequest("Invalid password");
      const token = signToken(user.id);
      const protectedUser = user.toJSON();
      delete protectedUser.password;
      res.status(200).json({
        message: "Login successfull",
        token,
        user: protectedUser,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
