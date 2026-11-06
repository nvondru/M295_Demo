import { HttpError } from "../errors.js";
import type { CreateGradeInput } from "../schemas/grade.schema.js";
import * as gradeStore from "../stores/grade.store.js";
import * as subjectService from "./subject.service.js";
import * as userService from "./user.service.js";

export function getAllForUser(userId: number) {
  userService.getById(userId); // wirft 404, falls es den User nicht gibt
  return gradeStore.findAllByUser(userId);
}

export function getById(userId: number, id: number) {
  userService.getById(userId);
  const grade = gradeStore.findByIdForUser(id, userId);
  if (!grade) {
    throw new HttpError(404, "Note nicht gefunden");
  }
  return grade;
}

export function create(userId: number, data: CreateGradeInput) {
  userService.getById(userId);
  subjectService.getById(data.subjectId); // wirft 404, falls es das Fach nicht gibt

  // Pro User und Fach gibt es nur eine Note (UNIQUE in der Tabelle)
  if (gradeStore.findByUserAndSubject(userId, data.subjectId)) {
    throw new HttpError(409, "Für dieses Fach gibt es schon eine Note");
  }
  return gradeStore.create(userId, data);
}

export function update(userId: number, id: number, data: CreateGradeInput) {
  getById(userId, id); // wirft 404 für User oder Note
  subjectService.getById(data.subjectId);

  const sameSubject = gradeStore.findByUserAndSubject(userId, data.subjectId);
  if (sameSubject && sameSubject.id !== id) {
    throw new HttpError(409, "Für dieses Fach gibt es schon eine Note");
  }
  return gradeStore.update(id, userId, data);
}

export function remove(userId: number, id: number) {
  getById(userId, id);
  gradeStore.remove(id, userId);
}
