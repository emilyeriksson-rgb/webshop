import { Router } from "express";

const router = Router();

const messages = [
  {
    user: "System",
    message: "Chatten startad"
  }
];

router.get("/", (req, res) => {
  res.json(messages);
});

router.post("/", (req, res) => {
  messages.push(req.body);

  res.json({
    success: true
  });
});

export default router;