import Database from 'better-sqlite3'

// Öffnet die Datei daten.sqlite (wird beim ersten Mal erstellt)
export const db = new Database(process.env.DB_PATH)

// Tabelle anlegen, falls sie noch nicht existiert
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    username    TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS subjects (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL UNIQUE,
    imagePath   TEXT NOT NULL,
    description TEXT NOT NULL
  )
`)

db.exec(`
  CREATE TABLE IF NOT EXISTS grades (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    value       TEXT NOT NULL,
    subjectId   INTEGER NOT NULL,
    userId      INTEGER NOT NULL,
    UNIQUE      (subjectId, userId),
    FOREIGN KEY (subjectId) REFERENCES subjects(id),
    FOREIGN KEY (userId) REFERENCES users(id)    
  )
`)

// Admin einmalig anlegen
const admin = db.prepare('SELECT * FROM users WHERE username = ?').get('Admin')
if (!admin) {
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('Admin', '1234')
    console.log('Admin-Benutzer angelegt (Passwort 1234)')
}