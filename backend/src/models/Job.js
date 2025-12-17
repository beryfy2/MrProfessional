import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String },
    experience: { type: String },
    urgent: { type: Boolean, default: false },
    experienceLevel: { type: String },
    location: { type: String },
    responsibilities: [{ type: String }],
    qualifications: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);
