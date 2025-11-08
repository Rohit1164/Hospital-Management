import { MedicalRecord } from "../models/MedicalRecord.js";

// Create Medical Record (Doctor Only)
export const createRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.create({
      ...req.body,
      doctor: req.user.id, // logged-in doctor
    });

    res.status(201).json({ msg: "Record created", record });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all Records (Admin/Doctor)
export const getAllRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find()
      .populate("doctor", "name specialization")
      .populate("hospital", "name city");

    res.json({ records });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get Records by patient name
export const getRecordsByPatient = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      patientName: req.params.name,
    });

    res.json({ records });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update Record (Only the doctor who created it)
export const updateRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);

    if (!record) return res.status(404).json({ msg: "Not found" });

    // Check if logged doctor owns this record
    if (record.doctor.toString() !== req.user.id)
      return res.status(403).json({ msg: "Unauthorized" });

    const updated = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ msg: "Updated", updated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete Record (Admin Only)
export const deleteRecord = async (req, res) => {
  try {
    await MedicalRecord.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
