import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema(
  {
    filename: String,
    url: String,
    mimetype: String,
    size: Number
  },
  { timestamps: true }
);

const QASchema = new mongoose.Schema(
  {
    question: String,
    answer: String
  },
  { _id: false }
);

const SubtitleSchema = new mongoose.Schema(
  {
    navItem: { type: mongoose.Schema.Types.ObjectId, ref: 'NavItem', required: true },
    title: { type: String, required: true },
    content: { type: String },
    files: [FileSchema],
    questions: [QASchema]
  },
  { timestamps: true }
);

export default mongoose.model('Subtitle', SubtitleSchema);

