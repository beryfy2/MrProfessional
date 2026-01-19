import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    position: { type: String, required: true },
    designation: { type: String },
    department: { type: String, required: true },
    phone: { type: String },
    photoUrl: { type: String },
    address: { type: String },
    bio: { type: String },
    dob: { type: Date },
    joinDate: { type: Date },
    manager: { type: String },
    salary: { type: String },
    isAdvisor: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Employee', EmployeeSchema);
