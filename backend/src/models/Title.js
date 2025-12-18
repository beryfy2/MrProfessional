import mongoose from 'mongoose';

const TitleSchema = new mongoose.Schema(
  {
    navItem: { type: mongoose.Schema.Types.ObjectId, ref: 'NavItem', required: true },
    title: { type: String, required: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Title', TitleSchema);
