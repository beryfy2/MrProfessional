import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema(
  {
    publication: { type: String, required: true }, // e.g. "Entrepreneur Hunt"
    title: { type: String, required: true },       // e.g. "Filing GST Made Easy"
    content: { type: String, required: true },     // Description/Body
    link: { type: String, required: true },        // External URL
    photo: { type: String, required: true },       // Logo/Image URL
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Media', MediaSchema);
