import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    position: { type: String, required: true },
    designation: { type: String },
    department: { type: String, required: true },
    phone: { type: String },
    photoUrl: { type: String },
    address: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
    gender: { type: String },
    bloodGroup: { type: String },
    maritalStatus: { type: String },
    bio: { type: String },
    dob: { type: Date },
    joinDate: { type: Date },
    manager: { type: String },
    salary: { type: String },
    employeeId: { type: String },
    employmentType: { type: String },
    workLocation: { type: String },
    educationLevel: { type: String },
    degree: { type: String },
    institution: { type: String },
    graduationYear: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Employee', EmployeeSchema);
