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
    ref: "Category",
    required: true
  },

  section: {
    type: String,
    default: "general",       // lowercase default
    set: v => v.toLowerCase() // normalize any input to lowercase
  },

  rank: { type: Number, default: 999 },

  description: String,
  tags: [String],

  pros: [String],
  cons: [String],

  status: {
    type: String,
    default: "pending"
  },

  addedBy: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Link", LinkSchema);
