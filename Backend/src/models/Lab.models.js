import mongoose from "mongoose";

const labSchema = new mongoose.Schema(
  {
    // Patient reference (who requested or underwent the test)
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient reference is required"],
    },

    // Doctor who ordered the test
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor reference is required"],
    },

    // Name of the test (e.g., Blood Test, X-Ray)
    testName: {
      type: String,
      required: [true, "Test name is required"],
      trim: true,
    },

    // Date when the test was conducted
    testDate: {
      type: Date,
      required: [true, "Test date is required"],
      default: Date.now,
    },

    // Cost of the test
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },

    // Result file (e.g., PDF or image link)
    resultFile: {
      type: String,
      default: "",
    },

    // Test findings or notes
    reportSummary: {
      type: String,
      default: "",
    },

    // Status of the test
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },

    // Billing status (linked with Bill model)
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
