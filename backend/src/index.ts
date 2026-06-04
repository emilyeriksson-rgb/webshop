import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import chatRouter from "./routes/chat.js";

const app = express();
const PORT = 3000;

app.use(cors());
    
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/chat", chatRouter);

app.get("/", (req, res) => {
  res.send("Servern fungerar!");
});

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});