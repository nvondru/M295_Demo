import { Router } from "express";
import { createUserSchema } from '../schemas/user.schema.js'
import { HttpError } from '../errors.js'

const router = Router();

// Testdaten (später aus der Datenbank)
const users = [
  { id: 1, username: 'Admin' },
  { id: 2, username: 'Anna' },
]

// Alle Benutzer lesen
router.get('/', (req, res) => {
  res.json(users) // Statuscode 200 ist Standard
})

// Einen Benutzer anhand der ID lesen
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const user = users.find((u) => u.id === id)

  if (!user) {
    throw new HttpError(404, 'Benutzer nicht gefunden')
  }
  res.json(user)
})

// Neuen Benutzer erstellen
router.post('/', (req, res) => {
  const result = createUserSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: 'Validierung fehlgeschlagen',
      fields: result.error.flatten().fieldErrors,
    })
  }

  const { username, password } = result.data;

  const neu = { id: users.length + 1, username }
  users.push(neu)
  res.status(201).json(neu) // 201 = Created
})

// Benutzer löschen
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ fehler: 'ungültige id' })
  }

  const index = users.findIndex(u => u.id === id)

  if (index === -1) {
    return res.status(404).json({ fehler: 'user nicht gefunden' })
  }

  users.splice(index, 1) // removes exactly 1 element at that position

  res.status(204).end() // 204 = No Content -> geeignet bei DELETE
})
export default router;
