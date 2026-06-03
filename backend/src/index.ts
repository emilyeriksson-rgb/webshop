import express from "express";
import productsRouter from "./routes/products.js";

const app = express();
const PORT = 3000;


app.use(express.json());

app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});