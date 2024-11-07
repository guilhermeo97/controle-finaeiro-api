import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("Rota de login");
});

router.get("/cadastro", (req, res) => {
  res.send("Rota de cadastro");
});

export default router;
