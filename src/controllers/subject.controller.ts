import type { Request, Response } from "express";
import {
  createSubjectSchema,
  updateSubjectSchema,
} from "../schemas/subject.schema.js";
import * as subjectService from "../services/subject.service.js";
import { parseId } from "../utils/parseId.js";

export function getSubjects(req: Request, res: Response) {
  res.json(subjectService.getAll());
}

export function getSubject(req: Request, res: Response) {
  const id = parseId(req.params.id);
  res.json(subjectService.getById(id));
}

export function createSubject(req: Request, res: Response) {
  // Multer hat die Datei schon gespeichert. Den Dateinamen nehmen wir aus req.file,
  // NACH ...req.body, damit der Client imagePath nicht selbst setzen kann.
  const data = createSubjectSchema.parse({
    ...req.body,
    imagePath: req.file?.filename,
  });
  res.status(201).json(subjectService.create(data));
}

export function updateSubject(req: Request, res: Response) {
  const id = parseId(req.params.id);
  const data = updateSubjectSchema.parse({
    ...req.body,
    imagePath: req.file?.filename,
  });
  res.json(subjectService.update(id, data));
}

export function deleteSubject(req: Request, res: Response) {
  const id = parseId(req.params.id);
  subjectService.remove(id);
  res.status(204).end();
}
