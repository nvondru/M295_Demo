import 'dotenv/config'
import express from 'express'

const app = express()

console.log(process.env.DB_PATH)

app.get('/', (req, res) => {
    res.send('Hallo Welt')
})

app.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000')
})