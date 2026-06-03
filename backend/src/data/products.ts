import fs from "node:fs";
import path from "node:path";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const filePath = path.join(
  process.cwd(),
  "backend",
  "src",
  "data",
  "products.json"
);

export function getProducts(): Product[] {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}