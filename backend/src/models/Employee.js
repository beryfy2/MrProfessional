import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    phone: { type: String },
    photoUrl: { type: String },
    address: { type: String },
    bio: { type: String },
    joinDate: { type: Date },
    manager: { type: String },
    salary: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Employee', EmployeeSchema);

