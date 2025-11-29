import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, default: "📁" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Category", CategorySchema);
