import Database from 'better-sqlite3'

// Öffnet die Datei daten.sqlite (wird beim ersten Mal erstellt)
export const db = new Database(process.env.DB_PATH)

// Tabelle anlegen, falls sie noch nicht existiert
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`)

// Admin einmalig anlegen
const admin = db.prepare('SELECT * FROM users WHERE username = ?').get('Admin')
if (!admin) {
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('Admin', '1234')
    console.log('Admin-Benutzer angelegt (Passwort 1234)')
}