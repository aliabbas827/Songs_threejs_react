import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const Signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedpassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedpassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const token = jwt.sign({ email: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("acess_token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });
    const { password: hashedpassword, ...rest } = validUser._doc;
    return res
      .status(200)
      .json({ user: rest, message: "User logged in successfully" });
  } catch (error) {
    next(error);
  }
};

export const GoogleAuth = async (req, res, next) => {
  const { name, email, photo } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ email: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("acess_token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      const { password: hashedpassword, ...rest } = user._doc;
      return res
        .status(200)
        .json({ user: rest, message: "User logged in successfully" });
    } else {
      const genratePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(genratePassword, 10);

      const newUser = new User({
        username:
          name.replace(" ", "").toLowerCase() +
          Math.floor(Math.random() * 1000).toString(),
        email,
        profilePicture: photo,
        password: hashedPassword,
      });
      await newUser.save();
      const token = jwt.sign({ email: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("acess_token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
      const { password: hashedpassword, ...rest } = newUser._doc;
      return res
        .status(200)
        .json({ user: rest, message: "User logged in successfully" });
    }
  } catch (error) {
    next(error);
  }
};
