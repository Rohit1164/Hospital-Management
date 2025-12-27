import { Appointment } from "../models/appointment.models.js";

export async function createAppointment(req, res) {
  try {
    const { patientName, doctor, date, time, status } = req.body;

    const appointed = await Appointment.create({
      patientName,
      doctor,
      date,
      time,
      status,
    });

    await appointed.save();

    if (!appointed) {
      return res.status(400).json({ message: "Appointment creation failed" });
    }
    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: appointed,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function getAppointment(req, res) {
  try {
    const getAppoint = await Appointment.find({}).populate("doctor", "name");

    if (!getAppoint) {
      return res.status(400).json({ message: "No Appointment" });
    }

    return res
      .status(200)
      .json({ message: "No Appointment", data: getAppoint });
  } catch (error) {
    console.error("Error get appointment:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function getAppointmentByID(req, res) {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id).populate(
      "doctor",
      "name"
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({
      message: "Appointment fetched successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error getting appointment By ID:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function UpdateAppointment(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const appointment = await Appointment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    return res.status(200).json({
      message: "Appointment Update successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error Update appointment:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function deleteAppointment(req, res) {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    return res.status(200).json({
      message: "Appointment Deleted successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error Delete appointment:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export const countAppointment = async (req, res) => {
  try {
    const count = await Appointment.countDocuments();

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
