import mongoose from 'mongoose';

const NavItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    titles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Title' }]
  },
  { timestamps: true }
);

export default mongoose.model('NavItem', NavItemSchema);
