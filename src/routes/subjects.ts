import { Router } from "express";
import * as subjectController from "../controllers/subject.controller.js";
import { upload } from "../upload.js";

const router = Router();

/**
 * @openapi
 * /subjects:
 *   get:
 *     summary: Gibt alle Fächer zurück
 *     responses:
 *       200:
 *         description: Liste der Fächer
 */
router.get("/", subjectController.getSubjects);

/**
 * @openapi
 * /subjects/{id}:
 *   get:
 *     summary: Gibt ein Fach anhand der ID zurück
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fach gefunden
 *       400:
 *         description: Ungültige ID
 *       404:
 *         description: Fach nicht gefunden
 */
router.get("/:id", subjectController.getSubject);

/**
 * @openapi
 * /subjects:
 *   post:
 *     summary: Erstellt ein Fach mit Bild
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201:
 *         description: Fach erstellt
 *       400:
 *         description: Validierung fehlgeschlagen
 *       409:
 *         description: Titel schon vergeben
 *       413:
 *         description: Datei zu gross
 *       415:
 *         description: Dateityp nicht erlaubt
 */
// upload.single('image') ist die Middleware VOR dem Controller:
// sie speichert die Datei in uploads/ und füllt req.file und req.body
router.post("/", upload.single("image"), subjectController.createSubject);

/**
 * @openapi
 * /subjects/{id}:
 *   put:
 *     summary: Ändert ein Fach (neues Bild optional)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Fach geändert
 *       400:
 *         description: Validierung fehlgeschlagen
 *       404:
 *         description: Fach nicht gefunden
 *       409:
 *         description: Titel schon vergeben
 */
router.put("/:id", upload.single("image"), subjectController.updateSubject);

/**
 * @openapi
 * /subjects/{id}:
 *   delete:
 *     summary: Löscht ein Fach, sein Bild und seine Noten
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Fach gelöscht
 *       404:
 *         description: Fach nicht gefunden
 */
router.delete("/:id", subjectController.deleteSubject);

export default router;
