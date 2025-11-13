import { Hospital } from "../models/hospital.models.js";

export const createHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json({ msg: "Hospital created", hospital });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json({ hospitals });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ msg: "Not found" });

    res.json({ hospital });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!hospital) return res.status(404).json({ msg: "Not found" });

    res.json({ msg: "Updated successfully", hospital });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) return res.status(404).json({ msg: "Not found" });

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
