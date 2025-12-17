import mongoose from 'mongoose';

const ResetTokenSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otpHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('ResetToken', ResetTokenSchema);
