import type { Request, Response } from "express";
import { createGradeSchema } from "../schemas/grade.schema.js";
import * as gradeService from "../services/grade.service.js";
import { parseId } from "../utils/parseId.js";

// Alle Routen liegen unter /users/:userId/grades
export function getGrades(req: Request, res: Response) {
  const userId = parseId(req.params.userId);
  res.json(gradeService.getAllForUser(userId));
}

export function getGrade(req: Request, res: Response) {
  const userId = parseId(req.params.userId);
  const id = parseId(req.params.id);
  res.json(gradeService.getById(userId, id));
}

export function createGrade(req: Request, res: Response) {
  const userId = parseId(req.params.userId);
  const data = createGradeSchema.parse(req.body);
  res.status(201).json(gradeService.create(userId, data));
}

export function updateGrade(req: Request, res: Response) {
  const userId = parseId(req.params.userId);
  const id = parseId(req.params.id);
  const data = createGradeSchema.parse(req.body);
  res.json(gradeService.update(userId, id, data));
}

export function deleteGrade(req: Request, res: Response) {
  const userId = parseId(req.params.userId);
  const id = parseId(req.params.id);
  gradeService.remove(userId, id);
  res.status(204).end();
}
