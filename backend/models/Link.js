import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  title: { type: String, required: true },

  urls: [
    {
      label: String,
      link: { type: String, required: true }
    }
  ],

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },

  tags: [String],
  description: String,

  addedBy: String,

  status: {
    type: String,
    default: "pending", // pending → approved → rejected
  },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Link", LinkSchema);
