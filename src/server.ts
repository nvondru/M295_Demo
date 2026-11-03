import express from "express";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);

// Query Parameter
app.get("/suche", (req, res) => {
  res.send(`Suche nach: ${req.query.begriff}`);
});

// Wenn keine andere Route zutrifft
app.use((req, res) => {
  res.status(404).json({ fehler: "Nicht gefunden" });
});

// Wenn in einer Route ein unbehandelter Fehler auftritt
/* eslint-disable */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ fehler: "Interner Serverfehler" });
});

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
