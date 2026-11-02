import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hallo Welt')
})

app.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000')
})