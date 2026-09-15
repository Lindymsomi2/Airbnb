import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "host", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default model("User", userSchema);
