import {Router} from "express";

const router = Router();

// Get Handler
router.get('/', (req, res) => {
    res.send('Alle Benutzer')
})

// Post Handler
router.post('/', (req, res) => {
    res.send('Neuer Benutzer erstellt')
})

// Route Parameter
router.get('/:id', (req, res) => {
    res.send(`Benutzer mit ID ${req.params.id}`)
})

export default router;