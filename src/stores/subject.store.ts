import { db } from "../db.js";
import type { CreateSubjectInput } from "../schemas/subject.schema.js";

export type Subject = {
  id: number;
  title: string;
  imagePath: string;
  description: string;
};

export function findAll(): Subject[] {
  return db.prepare("SELECT * FROM subjects").all() as Subject[];
}

export function findById(id: number): Subject | undefined {
  return db.prepare("SELECT * FROM subjects WHERE id = ?").get(id) as
    Subject | undefined;
}

export function findByTitle(title: string): Subject | undefined {
  return db.prepare("SELECT * FROM subjects WHERE title = ?").get(title) as
    Subject | undefined;
}

export function create(data: CreateSubjectInput): Subject {
  const info = db
    .prepare(
      "INSERT INTO subjects (title, imagePath, description) VALUES (?, ?, ?)",
    )
    .run(data.title, data.imagePath, data.description);
  return findById(Number(info.lastInsertRowid))!;
}

export function update(id: number, data: CreateSubjectInput): Subject {
  db.prepare(
    "UPDATE subjects SET title = ?, imagePath = ?, description = ? WHERE id = ?",
  ).run(data.title, data.imagePath, data.description, id);
  return findById(id)!;
}

export function remove(id: number): void {
  db.prepare("DELETE FROM subjects WHERE id = ?").run(id);
}
