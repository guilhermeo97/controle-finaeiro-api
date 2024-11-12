import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Rota de users12");
});

export default router;
