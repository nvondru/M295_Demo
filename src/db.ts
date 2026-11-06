import Database from 'better-sqlite3'

// Öffnet die Datei daten.sqlite (wird beim ersten Mal erstellt)
export const db = new Database(process.env.DB_PATH)

// SQLite prüft Fremdschlüssel nur, wenn man es pro Verbindung einschaltet
db.pragma('foreign_keys = ON')

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
    value       REAL NOT NULL,
    subjectId   INTEGER NOT NULL,
    userId      INTEGER NOT NULL,
    UNIQUE      (subjectId, userId),
    -- ON DELETE CASCADE: wird ein Fach oder User gelöscht, verschwinden seine Noten mit
    FOREIGN KEY (subjectId) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (userId)    REFERENCES users(id)    ON DELETE CASCADE
  )
`)

// Admin einmalig anlegen
const admin = db.prepare('SELECT * FROM users WHERE username = ?').get('Admin')
if (!admin) {
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('Admin', '1234')
    console.log('Admin-Benutzer angelegt (Passwort 1234)')
}