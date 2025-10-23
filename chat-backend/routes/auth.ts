import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, employeeID, email, password } = req.body;

  try {
    // Check if employeeID or email already exists
    const existingUser = await User.findOne({ $or: [{ employeeID }, { email }] });
    if (existingUser) return res.status(400).json({ message: "Employee ID or email already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, employeeID, email, password: hashedPassword });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id, employeeID: user.employeeID }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(201).json({ user: { name: user.name, employeeID: user.employeeID, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { employeeID, password } = req.body;

  try {
    const user = await User.findOne({ employeeID });
    if (!user) return res.status(400).json({ message: "Invalid employee ID or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid employee ID or password" });

    const token = jwt.sign({ id: user._id, employeeID: user.employeeID }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.json({ user: { name: user.name, employeeID: user.employeeID, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
