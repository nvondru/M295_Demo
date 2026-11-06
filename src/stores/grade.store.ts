import { db } from "../db.js";
import type { CreateGradeInput } from "../schemas/grade.schema.js";

export type Grade = {
  id: number;
  value: number;
  subjectId: number;
  userId: number;
};

export function findAllByUser(userId: number): Grade[] {
  return db
    .prepare("SELECT * FROM grades WHERE userId = ?")
    .all(userId) as Grade[];
}

// Auch die userId prüfen, damit man nicht über /users/1/grades/... die Note von User 2 sieht
export function findByIdForUser(id: number, userId: number): Grade | undefined {
  return db
    .prepare("SELECT * FROM grades WHERE id = ? AND userId = ?")
    .get(id, userId) as Grade | undefined;
}

export function findByUserAndSubject(
  userId: number,
  subjectId: number,
): Grade | undefined {
  return db
    .prepare("SELECT * FROM grades WHERE userId = ? AND subjectId = ?")
    .get(userId, subjectId) as Grade | undefined;
}

export function create(userId: number, data: CreateGradeInput): Grade {
  const info = db
    .prepare("INSERT INTO grades (value, subjectId, userId) VALUES (?, ?, ?)")
    .run(data.value, data.subjectId, userId);
  return findByIdForUser(Number(info.lastInsertRowid), userId)!;
}

export function update(
  id: number,
  userId: number,
  data: CreateGradeInput,
): Grade {
  db.prepare(
    "UPDATE grades SET value = ?, subjectId = ? WHERE id = ? AND userId = ?",
  ).run(data.value, data.subjectId, id, userId);
  return findByIdForUser(id, userId)!;
}

export function remove(id: number, userId: number): void {
  db.prepare("DELETE FROM grades WHERE id = ? AND userId = ?").run(id, userId);
}
