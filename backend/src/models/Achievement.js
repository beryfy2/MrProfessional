import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String
    },
    link: {
      type: String,
      required: true
    },
    photo: {
      type: String, // URL to the uploaded image
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model('Achievement', achievementSchema);
