import { Patient } from "../models/patient.models.js";

export const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json({ msg: "Patient registered", patient });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("admittedIn");
    res.json({ patients });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "admittedIn"
    );
    if (!patient) return res.status(404).json({ msg: "Not found" });
    res.json({ patient });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!patient) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "Updated successfully", patient });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const countPatient = async (req, res) => {
  try {
    const count = await Patient.countDocuments();

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
