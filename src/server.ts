import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import usersRouter from "./routes/users.js";
import subjectsRouter from "./routes/subjects.js";
import './db.js'
import {HttpError} from "./errors.js";
import {logger} from "./logger.js";
import cors from 'cors';
import helmet from 'helmet';
import {upload} from "./upload.js";
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import fs from 'node:fs'
import multer from 'multer'
import { z, ZodError } from 'zod'

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'meine-api', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }],
  },
  // wo Swagger nach Kommentaren sucht:
  apis: ['./src/**/*.ts'],
})


const app = express();

// Doku unter /api-docs anzeigen
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(logger)
app.use(helmet())
app.use(cors())
app.use(express.json());
app.use(express.static("public"));
// Hochgeladene Bilder im Browser anzeigen: http://localhost:3000/uploads/<dateiname>
app.use("/uploads", express.static("uploads"));

app.use("/users", usersRouter);
app.use("/subjects", subjectsRouter);

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
// Express erkennt den Error-Handler an den 4 Parametern, darum muss "next" stehen bleiben
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Fehlgeschlagene Anfrage -> hochgeladene Datei wieder löschen
  if (req.file) {
    fs.rmSync(req.file.path, { force: true })
  }

  // Zod-Validierung fehlgeschlagen -> 400 mit Fehlermeldung pro Feld
  if (err instanceof ZodError) {
    return res.status(400).json({
      fehler: 'Validierung fehlgeschlagen',
      felder: z.flattenError(err).fieldErrors,
    })
  }

  // Multer-Fehler, z.B. Datei zu gross -> 413
  if (err instanceof multer.MulterError) {
    const status = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400
    return res.status(status).json({ fehler: err.message })
  }

  // Unsere eigenen Fehler (404, 409, ...)
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ fehler: err.message })
  }

  console.error(err) // unbekannter Fehler → ins Log
  res.status(500).json({ fehler: 'Interner Serverfehler' })
})

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
