import { MedicalRecord } from "../models/medical_record.models.js";

export const createRecord = async (req, res) => {
  try {
    console.log("Incoming create request:", req.body);

    const record = await MedicalRecord.create({
      ...req.body,
      doctor: req.body.doctor || "6732abcde1234567890abcd", // temp fix if req.user.id not used
    });

    return res.status(201).json({ msg: "Record created", record });
  } catch (err) {
    console.error("Error creating record:", err);
    return res.status(500).json({ msg: err.message });
  }
};

export const getAllRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find();

    if (!records || records.length === 0)
      return res.json({ msg: "No Record Available" });

    return res.json({ records });
  } catch (err) {
    console.error("Error fetching records:", err);
    return res.status(500).json({ msg: err.message });
  }
};

export const getRecordsByPatient = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      patientName: req.params.name,
    });

    return res.json({ records });
  } catch (err) {
    console.error("Error fetching records by patient:", err);
    return res.status(500).json({ msg: err.message });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ msg: "Record not found" });

    const updated = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json({ msg: "Updated", updated });
  } catch (err) {
    console.error("Error updating record:", err);
    return res.status(500).json({ msg: err.message });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    await MedicalRecord.findByIdAndDelete(req.params.id);
    return res.json({ msg: "Deleted" });
  } catch (err) {
    console.error("Error deleting record:", err);
    return res.status(500).json({ msg: err.message });
  }
};
