import { Pharmacy } from "../models/pharmacy.models.js";

export async function createMedicine(req, res) {
  try {
    const {
      medicineName,
      batchNumber,
      manufacturer,
      supplier,
      quantity,
      unit,
      purchasePrice,
      sellingPrice,
      expiryDate,
      addedBy,
    } = req.body;

    // Validation
    if (
      !medicineName ||
      !batchNumber ||
      !manufacturer ||
      !quantity ||
      !unit ||
      !purchasePrice ||
      !sellingPrice ||
      !expiryDate ||
      !addedBy
    ) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const medicine = await Pharmacy.create({
      medicineName,
      batchNumber,
      manufacturer,
      supplier,
      quantity,
      unit,
      purchasePrice,
      sellingPrice,
      expiryDate,
      addedBy,
    });

    return res.status(201).json({
      message: "Medicine added successfully",
      data: medicine,
    });
  } catch (error) {
    console.error("Error creating medicine:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function getAllMedicines(req, res) {
  try {
    const medicines = await Pharmacy.find().populate("addedBy", "name email");

    if (!medicines || medicines.length === 0) {
      return res.status(404).json({ message: "No medicines found" });
    }

    return res.status(200).json({
      message: "Medicines fetched successfully",
      data: medicines,
    });
  } catch (error) {
    console.error("Error fetching medicines:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function getMedicineById(req, res) {
  try {
    const { id } = req.params;

    const medicine = await Pharmacy.findById(id).populate(
      "addedBy",
      "name email"
    );

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    return res.status(200).json({
      message: "Medicine fetched successfully",
      data: medicine,
    });
  } catch (error) {
    console.error("Error fetching medicine by ID:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function updateMedicine(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedMedicine = await Pharmacy.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    return res.status(200).json({
      message: "Medicine updated successfully",
      data: updatedMedicine,
    });
  } catch (error) {
    console.error("Error updating medicine:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function deleteMedicine(req, res) {
  try {
    const { id } = req.params;

    const deletedMedicine = await Pharmacy.findByIdAndDelete(id);

    if (!deletedMedicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    return res.status(200).json({
      message: "Medicine deleted successfully",
      data: deletedMedicine,
    });
  } catch (error) {
    console.error("Error deleting medicine:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
