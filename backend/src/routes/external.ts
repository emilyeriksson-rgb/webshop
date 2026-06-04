import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
  return res.status(response.status).json({
    message: "Fel från externt API"
  });
}

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Kunde inte hämta data"
    });
  }
});

export default router;