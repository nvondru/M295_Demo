import fs from "node:fs";
import path from "node:path";
import { HttpError } from "../errors.js";
import type {
  CreateSubjectInput,
  UpdateSubjectInput,
} from "../schemas/subject.schema.js";
import * as subjectStore from "../stores/subject.store.js";

// Bilddatei aus dem uploads-Ordner löschen (force: kein Fehler, falls sie fehlt)
function deleteImage(imagePath: string) {
  fs.rmSync(path.join("uploads", imagePath), { force: true });
}

export function getAll() {
  return subjectStore.findAll();
}

export function getById(id: number) {
  const subject = subjectStore.findById(id);
  if (!subject) {
    throw new HttpError(404, "Fach nicht gefunden");
  }
  return subject;
}

export function create(data: CreateSubjectInput) {
  if (subjectStore.findByTitle(data.title)) {
    throw new HttpError(409, "Ein Fach mit diesem Titel gibt es schon");
  }
  return subjectStore.create(data);
}

export function update(id: number, data: UpdateSubjectInput) {
  const old = getById(id); // wirft 404, falls es das Fach nicht gibt

  const sameTitle = subjectStore.findByTitle(data.title);
  if (sameTitle && sameTitle.id !== id) {
    throw new HttpError(409, "Ein Fach mit diesem Titel gibt es schon");
  }

  // Kein neues Bild hochgeladen -> altes behalten
  const imagePath = data.imagePath ?? old.imagePath;
  const subject = subjectStore.update(id, { ...data, imagePath });

  // Neues Bild hochgeladen -> altes Bild wird nicht mehr gebraucht
  if (data.imagePath) {
    deleteImage(old.imagePath);
  }
  return subject;
}

export function remove(id: number) {
  const subject = getById(id);
  subjectStore.remove(id); // Noten werden per ON DELETE CASCADE mitgelöscht
  deleteImage(subject.imagePath);
}
