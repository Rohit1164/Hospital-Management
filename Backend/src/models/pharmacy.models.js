import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: [true, "Medicine name is required"],
      trim: true,
    },

    batchNumber: {
      type: String,
      required: [true, "Batch number is required"],
      unique: true,
      uppercase: true,
    },

    manufacturer: {
      type: String,
      required: [true, "Manufacturer name is required"],
      trim: true,
    },

    supplier: {
      type: String,
      trim: true,
      default: "In-house",
    },

    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
    },

    unit: {
      type: String,
      enum: ["Tablet", "Capsule", "Syrup", "Injection", "Cream", "Ointment"],
      required: true,
    },

    purchasePrice: {
      type: Number,
      required: [true, "Purchase price required"],
    },

    sellingPrice: {
      type: Number,
      required: [true, "Selling price required"],
    },

    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    status: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock", "Expired"],
      default: "In Stock",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Middleware to auto-update medicine status
pharmacySchema.pre("save", function (next) {
  const today = new Date();

  if (this.expiryDate < today) {
    this.status = "Expired";
  } else if (this.quantity === 0) {
    this.status = "Out of Stock";
  } else if (this.quantity < 10) {
    this.status = "Low Stock";
  } else {
    this.status = "In Stock";
  }

  next();
});

export const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
