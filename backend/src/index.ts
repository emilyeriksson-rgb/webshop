import express from "express";
import cors from "cors";
import session from "express-session";

import productsRouter from "./routes/products.js";
import chatRouter from "./routes/chat.js";
import externalRouter from "./routes/external.js";
import sessionRouter from "./routes/session.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));
    

app.use("/api/products", productsRouter);
app.use("/api/chat", chatRouter);
app.use("/api/external", externalRouter);
app.use("/api/session", sessionRouter);

app.get("/", (req, res) => {
  res.send("Servern fungerar!");
});

app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});

