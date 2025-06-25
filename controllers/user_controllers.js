import { User } from "../models/user_models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const generateToken = (user) => {
  const userData = {
    id: user.id,
    role: user.role
  };

  const secretKey = process.env.JWT_SECRET;

  const token = jwt.sign(userData, secretKey, {
    expiresIn: "3h"
  });

  return token;
};


export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

     if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    const token = generateToken(user); 

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Oops! server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Wrong email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = generateToken(user); 

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Oops! Server error" });
  }
};
