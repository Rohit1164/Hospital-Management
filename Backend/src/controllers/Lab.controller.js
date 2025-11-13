import { Lab } from "../models/Lab.models.js";

export async function createLab(req, res) {
  try {
    const {
      patient,
      doctor,
      testName,
      testDate,
      amount,
      resultFile,
      reportSummary,
      status,
      billingStatus,
    } = req.body;

    // Validation
    if (!patient || !doctor || !testName || !amount) {
      return res.status(400).json({
        message: "Patient, Doctor, Test Name, and Amount are required",
      });
    }

    const labTest = await Lab.create({
      patient,
      doctor,
      testName,
      testDate,
      amount,
      resultFile,
      reportSummary,
      status,
      billingStatus,
    });

    return res.status(201).json({
      message: "Lab test record created successfully",
      data: labTest,
    });
  } catch (error) {
    console.error("Error creating lab test:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function getLabs(req, res) {
  try {
    const labs = await Lab.find();

    if (!labs || labs.length === 0) {
      return res.status(404).json({ message: "No lab records found" });
    }

    return res.status(200).json({
      message: "Lab records fetched successfully",
      data: labs,
    });
  } catch (error) {
    console.error("Error fetching lab records:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function getLabByID(req, res) {
  try {
    const { id } = req.params;
    const lab = await Lab.findById(id);

    if (!lab) {
      return res.status(404).json({ message: "Lab test not found" });
    }

    return res.status(200).json({
      message: "Lab test fetched successfully",
      data: lab,
    });
  } catch (error) {
    console.error("Error fetching lab by ID:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function updateLab(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const lab = await Lab.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!lab) {
      return res.status(404).json({ message: "Lab test not found" });
    }

    return res.status(200).json({
      message: "Lab test updated successfully",
      data: lab,
    });
  } catch (error) {
    console.error("Error updating lab test:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function deleteLab(req, res) {
  try {
    const { id } = req.params;

    const lab = await Lab.findByIdAndDelete(id);

    if (!lab) {
      return res.status(404).json({ message: "Lab test not found" });
    }

    return res.status(200).json({
      message: "Lab test deleted successfully",
      data: lab,
    });
  } catch (error) {
    console.error("Error deleting lab test:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
