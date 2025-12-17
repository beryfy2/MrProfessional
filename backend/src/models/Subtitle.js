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
    answer: String,
    format: { type: String, enum: ['table', 'written', 'both'], default: 'written' },
    table: {
      headers: [String],
      rows: [[String]]
    },
    files: [FileSchema]
  },
  { _id: false }
);

const SubtitleSchema = new mongoose.Schema(
  {
    parentTitleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Title', required: true },
    title: { type: String, required: true },
    content: { type: String },
    files: [FileSchema],
    questions: [QASchema]
  },
  { timestamps: true }
);

export default mongoose.model('Subtitle', SubtitleSchema);
