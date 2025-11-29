import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: String,
  icon: String,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
});

export default mongoose.model("Category", CategorySchema);
