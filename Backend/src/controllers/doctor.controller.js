import { Doctor } from "../models/doctor.models.js";

export async function createDoctor(req, res) {
  try {
    const doctor = await Doctor.create(req.body);
    res.json({ msg: "Doctor added successfully", doctor });
  } catch (error) {
    res.status(400).json({ msg: "Failed to add doctor", error });
  }
}

export async function getDoctors(req, res) {
  const doctors = await Doctor.find().populate("worksInHospitals");
  res.json(doctors);
}

export async function getDoctorById(req, res) {
  const doctor = await Doctor.findById(req.params.id).populate(
    "worksInHospitals"
  );
  if (!doctor) return res.status(404).json({ msg: "Doctor not found" });
  res.json(doctor);
}

export async function updateDoctor(req, res) {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ msg: "Doctor updated", doctor });
}

export async function deleteDoctor(req, res) {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ msg: "Doctor removed" });
}

export async function assignHospital(req, res) {
  const { doctorId, hospitalId } = req.body;

  const doctor = await Doctor.findById(doctorId);
  doctor.worksInHospitals.push(hospitalId);
  await doctor.save();

  res.json({ msg: "Hospital assigned", doctor });
}

export const countDoctor = async (req, res) => {
  try {
    const count = await Doctor.countDocuments();

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
