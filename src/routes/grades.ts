import { Router } from "express";
import * as gradeController from "../controllers/grade.controller.js";

// mergeParams: true -> req.params.userId aus "/users/:userId/grades" ist hier sichtbar
const router = Router({ mergeParams: true });

/**
 * @openapi
 * /users/{userId}/grades:
 *   get:
 *     summary: Gibt alle Noten eines Benutzers zurück
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste der Noten
 *       404:
 *         description: Benutzer nicht gefunden
 */
router.get("/", gradeController.getGrades);

/**
 * @openapi
 * /users/{userId}/grades/{id}:
 *   get:
 *     summary: Gibt eine Note eines Benutzers zurück
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Note gefunden
 *       404:
 *         description: Benutzer oder Note nicht gefunden
 */
router.get("/:id", gradeController.getGrade);

/**
 * @openapi
 * /users/{userId}/grades:
 *   post:
 *     summary: Erstellt eine Note für einen Benutzer
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value: { type: number, minimum: 1, maximum: 6 }
 *               subjectId: { type: integer }
 *     responses:
 *       201:
 *         description: Note erstellt
 *       400:
 *         description: Validierung fehlgeschlagen
 *       404:
 *         description: Benutzer oder Fach nicht gefunden
 *       409:
 *         description: Für dieses Fach gibt es schon eine Note
 */
router.post("/", gradeController.createGrade);

/**
 * @openapi
 * /users/{userId}/grades/{id}:
 *   put:
 *     summary: Ändert eine Note
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value: { type: number, minimum: 1, maximum: 6 }
 *               subjectId: { type: integer }
 *     responses:
 *       200:
 *         description: Note geändert
 *       400:
 *         description: Validierung fehlgeschlagen
 *       404:
 *         description: Benutzer, Note oder Fach nicht gefunden
 *       409:
 *         description: Für dieses Fach gibt es schon eine Note
 */
router.put("/:id", gradeController.updateGrade);

/**
 * @openapi
 * /users/{userId}/grades/{id}:
 *   delete:
 *     summary: Löscht eine Note
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Note gelöscht
 *       404:
 *         description: Benutzer oder Note nicht gefunden
 */
router.delete("/:id", gradeController.deleteGrade);

export default router;
