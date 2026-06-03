import { Router } from "express";
import { getProducts } from "../data/products.js";

const router = Router();

router.get("/", (req, res) => {
  const products = getProducts();
  res.json(products);
});

export default router;