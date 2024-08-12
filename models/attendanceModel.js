import mongoose from "mongoose";

const AttendanceSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shiftId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
    },
    clockIn: {
      type: Date,
      required: true,
    },
    clockOut: {
      type: Date,
    },
    breaks: [
      {
        start: Date,
        end: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", AttendanceSchema);
