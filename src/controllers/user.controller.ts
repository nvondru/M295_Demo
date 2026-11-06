import type { Request, Response } from "express";
import { createUserSchema } from "../schemas/user.schema.js";
import * as userService from "../services/user.service.js";
import { parseId } from "../utils/parseId.js";

export function getUsers(req: Request, res: Response) {
  res.json(userService.getAll()); // Statuscode 200 ist Standard
}

export function getUser(req: Request, res: Response) {
  const id = parseId(req.params.id);
  res.json(userService.getById(id));
}

export function createUser(req: Request, res: Response) {
  // parse() wirft bei ungültigen Daten einen ZodError -> zentraler Error-Handler -> 400
  const data = createUserSchema.parse(req.body);
  res.status(201).json(userService.create(data)); // 201 = Created
}

export function updateUser(req: Request, res: Response) {
  const id = parseId(req.params.id);
  const data = createUserSchema.parse(req.body);
  res.json(userService.update(id, data));
}

export function deleteUser(req: Request, res: Response) {
  const id = parseId(req.params.id);
  userService.remove(id);
  res.status(204).end(); // 204 = No Content -> geeignet bei DELETE
}
