import express from "express";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

const router = express.Router();

// Create Product
router.post("/", async (req, res) => {
  try {
    const { user } = req.body;
    const existingUser = await User.findById(user);
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Products (with user info)
router.get("/", async (req, res) => {
  const products = await Product.find().populate("user", "name email");
  res.json(products);
});

// Get Single Product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted successfully" });
});

export default router;
