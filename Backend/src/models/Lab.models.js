import mongoose from "mongoose";

const labSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient reference is required"],
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor reference is required"],
    },

    testName: {
      type: String,
      required: [true, "Test name is required"],
      trim: true,
    },

    testDate: {
      type: Date,
      required: [true, "Test date is required"],
      default: Date.now,
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },

    resultFile: {
      type: String,
      default: "",
    },

    reportSummary: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },

    billingStatus: {
      type: String,
      enum: ["Unpaid", "Paid", "Cancelled"],
      default: "Unpaid",
    },
  },
  { timestamps: true }
);

labSchema.pre(/^find/, function (next) {
  this.populate("patient", "name age gender").populate(
    "doctor",
    "name specialization"
  );
  next();
});

export const Lab = mongoose.model("Lab", labSchema);
