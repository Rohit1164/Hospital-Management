import { Bill } from "../models/billing.models.js";

export async function createBill(req, res) {
  try {
    const { name, amount, status } = req.body;

    if (!name || !amount || !status) {
      return res.json("All Field are requered");
    }
    const bill = await Bill.create({ name, amount, status });

    return res
      .status(201)
      .json({ message: "Bill created successfully", data: bill });
  } catch (error) {
    console.error("Error creating bill:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function getBill(req, res) {
  try {
    const bills = await Bill.find();

    if (!bills || bills.length === 0) {
      return res.status(404).json({ message: "No bills found" });
    }

    return res
      .status(200)
      .json({ message: "Bills fatched successfully", data: bills });
  } catch (error) {
    console.error("Error fetching bills:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function getBillByID(req, res) {
  try {
    const { id } = req.params;

    const bill = await Bill.findById(id);

    if (!bill) {
      return res.status(400).json("No Bills");
    }

    return res
      .status(200)
      .json({ message: "bill fatched successfully", data: bill });
  } catch (error) {
    console.error("Error fetching bills:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function UpdateBill(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const bill = await Bill.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!bill) {
      return res.status(400).json("Bill not found");
    }

    return res
      .status(200)
      .json({ message: "Bill updated successfully", data: bill });
  } catch (error) {
    console.error("Error updating bills:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function deleteBill(req, res) {
  try {
    const { id } = req.params;

    const bill = await Bill.findByIdAndDelete(id);

    if (!bill) {
      return res.status(400).json("Bill not found");
    }

    return res
      .status(200)
      .json({ message: "bill deleted successfully", data: bill });
  } catch (error) {
    console.error("Error deleting bills:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
