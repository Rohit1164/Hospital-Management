import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    patientAge: { type: Number, required: true, min: 0 },
    diagnosis: { type: String, required: true },
    treatment: { type: String, required: true },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    prescription: { type: String },
  },
  { timestamps: true }
);

export const MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);
