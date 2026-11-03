import express from 'express'
import usersRouter from './routes/users.js'

const app = express()

app.use(express.json())
app.use(express.static('public'))

app.use("/users", usersRouter);


// Query Parameter
app.get('/suche', (req, res) => {
    res.send(`Suche nach: ${req.query.begriff}`)
})

app.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000')
})