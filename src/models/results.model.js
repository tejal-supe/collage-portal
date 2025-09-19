import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      required: true,
      enum: ["A", "B", "C", "D", "F"],
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);
export default Result;
