import { db } from "../db.js";
import type { CreateUserInput } from "../schemas/user.schema.js";

// So sieht ein User in unseren Antworten aus (ohne Passwort!)
export type User = { id: number; username: string };

export function findAll(): User[] {
  return db.prepare("SELECT id, username FROM users").all() as User[];
}

export function findById(id: number): User | undefined {
  return db.prepare("SELECT id, username FROM users WHERE id = ?").get(id) as
    User | undefined;
}

export function findByUsername(username: string): User | undefined {
  return db
    .prepare("SELECT id, username FROM users WHERE username = ?")
    .get(username) as User | undefined;
}

export function create(data: CreateUserInput): User {
  const info = db
    .prepare("INSERT INTO users (username, password) VALUES (?, ?)")
    .run(data.username, data.password);
  return findById(Number(info.lastInsertRowid))!;
}

export function update(id: number, data: CreateUserInput): User {
  db.prepare("UPDATE users SET username = ?, password = ? WHERE id = ?").run(
    data.username,
    data.password,
    id,
  );
  return findById(id)!;
}

export function remove(id: number): void {
  db.prepare("DELETE FROM users WHERE id = ?").run(id);
}
