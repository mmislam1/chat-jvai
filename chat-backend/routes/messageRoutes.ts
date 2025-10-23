import express, { Request, Response } from "express";
import  Message  from "../models/Message";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const { employeeID, message } = req.body;
    if (!employeeID || !message) {
      return res.status(400).json({ message: "Employee ID and message are required" });
    }

    const newMessage = new Message({ employeeID, message });
    await newMessage.save();

    res.status(201).json({ message: "Message saved successfully", data: newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const { employeeID } = req.query;

    const filter = employeeID ? { employeeID } : {};
    const messages = await Message.find(filter).sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
