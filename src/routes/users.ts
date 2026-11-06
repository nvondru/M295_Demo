import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Gibt alle Benutzer zurück
 *     responses:
 *       200:
 *         description: Liste der Benutzer
 */
router.get("/", userController.getUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Gibt einen Benutzer anhand der ID zurück
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Benutzer gefunden
 *       400:
 *         description: Ungültige ID
 *       404:
 *         description: Benutzer nicht gefunden
 */
router.get("/:id", userController.getUser);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Erstellt einen neuen Benutzer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *     responses:
 *       201:
 *         description: Benutzer erstellt
 *       400:
 *         description: Validierung fehlgeschlagen
 *       409:
 *         description: Benutzername schon vergeben
 */
router.post("/", userController.createUser);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Ändert einen Benutzer
 *     parameters:
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
 *               username: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Benutzer geändert
 *       400:
 *         description: Validierung fehlgeschlagen
 *       404:
 *         description: Benutzer nicht gefunden
 *       409:
 *         description: Benutzername schon vergeben
 */
router.put("/:id", userController.updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Löscht einen Benutzer und seine Noten
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Benutzer gelöscht
 *       404:
 *         description: Benutzer nicht gefunden
 */
router.delete("/:id", userController.deleteUser);

export default router;
