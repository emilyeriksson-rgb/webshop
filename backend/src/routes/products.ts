import { Router } from "express";
import { getProducts } from "../data/products.js";

const router = Router();

router.get("/", (req, res) => {
  const products = getProducts();
  res.json(products);
});

router.get("/:id", (req, res) => {
  const products = getProducts();

  const id = Number(req.params.id);
  const product = products[id];

  if (!product) {
    return res.status(404).json({
      message: "Produkten hittades inte"
    });
  }

  res.json(product);
});

router.put("/:id", (req, res) => {
  const products = getProducts();

  const id = Number(req.params.id);
  const product = products[id];

  if (!product) {
    return res.status(404).json({
      message: "Produkten hittades inte"
    });
  }

  products[id] = {
    ...product,
    ...req.body
  };

  res.json(products[id]);
});

export default router;