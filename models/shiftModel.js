import mongoose from "mongoose";

const ShiftSchema = mongoose.Schema(
  {
    shiftName: {
      type: String,
      enum: ["day", "night"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Shift", ShiftSchema);
