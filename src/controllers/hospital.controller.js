// import { Hospital } from "../models/hospital.models.js";

// const loginhospital = async (req, res) => {
//   const { name, addressLine1, addressLine2, city, pincode, specializedIn } =
//     req.body;

//   if (!name || !addressLine1 || addressLine2 || !city || pincode) {
//     console.log("All field are required");
//   }

//   const hospital = await Hospital.create({
//     name,
//     addressLine1,
//     addressLine2,
//     city,
//     pincode,
//     specializedIn,
//   });
//   console.log(hospital);
//   return res.status(201).json({
//     message: "admin login successfully",
//     hospital,
//   });
// };
// export { loginhospital };

import { Hospital } from "../models/hospital.models.js";

// Create Hospital
export const createHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json({ msg: "Hospital created", hospital });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get All Hospitals
export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json({ hospitals });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get Single Hospital by ID
export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ msg: "Not found" });

    res.json({ hospital });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update Hospital
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

// Delete Hospital
export const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!hospital) return res.status(404).json({ msg: "Not found" });

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
