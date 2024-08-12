import mongoose from "mongoose";

const payrollReportSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payPeriod: {
      type: String,
      required: true,
    },
    totalHours: {
      type: Number,
      required: true,
    },
    totalPay: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PayrollReport", payrollReportSchema);
