// import Doctor from "../models/doctor.models.js";

// // Registration with validation
// export async function doctorRegistration(req, res) {
//   try {
//     const {
//       name,
//       email,
//       password,
//       salary,
//       qualification,
//       experienceInYears,
//       worksInHospitals,
//     } = req.body;

//     const exists = await Doctor.findOne({ email });
//     if (exists)
//       return res
//         .status(400)
//         .json({ msg: "Doctor already worked in this hospital" });

//     const hash = await bcrypt.hash(password, 10);

//     const doctor = await Doctor.create({
//       name,
//       email,
//       password: hash,
//       salary,
//       qualification,
//       experienceInYears,
//       worksInHospitals,
//     });
//     res.json({ msg: "doctor registered", doctor });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// // Secure login (JWT/session based)

// export async function doctorlogin(req, res) {
//   try {
//     const { email, password } = req.body;
//     const doctor = await Doctor.findOne({ email });

//     if (!doctor) return res.status(400).json({ msg: "Admin not found" });

//     const match = await bcrypt.compare(password, admin.password);
//     if (!match) return res.status(400).json({ msg: "Invalid password" });

//     const token = jwt.sign({ id: admin._id }, "SECRET123", { expiresIn: "1d" });

//     res.json({ msg: "Login successful", token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// // Email/phone OTP verification (optional)

// // Password reset & change password

// // Role-based access (Doctor role)

// const user = async (req, res) => {
//   const { name, salary, qualification, experienceInYears } = req.body;
// };

// import { Doctor } from "../models/Doctor.js";
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
