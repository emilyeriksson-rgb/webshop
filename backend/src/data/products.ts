import { Router } from "express";

const router = Router();

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 9999
    },
    {
        id: 2,
        name: "Mus",
        price: 299
    }
];

router.get("/", (req, res) => {
    res.json(products);
});

export function getProducts() {
  return products;
}