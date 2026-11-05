import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import usersRouter from "./routes/users.js";
import './db.js'
import {HttpError} from "./errors.js";
import {logger} from "./logger.js";
import cors from 'cors';
import helmet from 'helmet';
import {upload} from "./upload.js";


const app = express();

app.use(logger)
app.use(helmet())
app.use(cors())
app.use(express.json());
app.use(express.static("public"));

app.use("/users", usersRouter);

// Query Parameter
app.get("/suche", (req, res) => {
  res.send(`Suche nach: ${req.query.begriff}`);
});

// upload.single('datei') ist die Middleware VOR dem Handler
app.post('/upload', upload.single('datei'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ fehler: 'Keine Datei erhalten' })
  }
  res.json({
    nachricht: 'Upload ok',
    name: req.file.originalname,
    groesse: req.file.size
  })
})

// Wenn keine andere Route zutrifft
app.use((req, res) => {
  res.status(404).json({ fehler: "Nicht gefunden" });
});

// Wenn in einer Route ein unbehandelter Fehler auftritt
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ fehler: err.message })
  }
  console.error(err) // unbekannter Fehler → ins Log
  res.status(500).json({ fehler: 'Interner Serverfehler' })
})

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
