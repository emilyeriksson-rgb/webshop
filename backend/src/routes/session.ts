import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const session = req.session as any;

  if (!session.visits) {
    session.visits = 0;
  }

  session.visits++;

  res.json({
    visits: session.visits,
  });
});

export default router;
