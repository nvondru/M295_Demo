import { Router } from "express";
import {db} from "../db.js"

const router = Router();

// Get Handler
router.get("/", (req, res) => {
  const users = db.prepare('SELECT id, username FROM users').all()
  res.json(users)
});

// Post Handler
router.post("/", (req, res) => {
  res.send("Neuer Benutzer erstellt");
});

// Route Parameter
router.get("/:id", (req, res) => {
  res.send(`Benutzer mit ID ${req.params.id}`);
});

export default router;
