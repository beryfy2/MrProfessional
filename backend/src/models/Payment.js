import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    transactionId: { type: String, unique: true },
    name: String,
    email: String,
    phone: String,
    address: String,
    amount: Number,
    status: {
      type: String,
      enum: ['INITIATED', 'SUCCESS', 'FAILED', 'PENDING'],
      default: 'INITIATED',
    },
    phonepeResponse: Object,
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
