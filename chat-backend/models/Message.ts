import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  employeeID: string;
  message: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    employeeID: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, 
  }
);

const Message = mongoose.model<IMessage>("Message", MessageSchema);

export default Message