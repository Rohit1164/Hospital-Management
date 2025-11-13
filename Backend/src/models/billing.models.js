import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Patient name is required"] },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Cancelled"],
      default: "Pending",
      required: true,
    },
  },
  { timestamps: true }
);

export const Bill = mongoose.model("Bill", billingSchema);
