import { HttpError } from "../errors.js";
import type { CreateUserInput } from "../schemas/user.schema.js";
import * as userStore from "../stores/user.store.js";

export function getAll() {
  return userStore.findAll();
}

export function getById(id: number) {
  const user = userStore.findById(id);
  if (!user) {
    throw new HttpError(404, "Benutzer nicht gefunden");
  }
  return user;
}

export function create(data: CreateUserInput) {
  if (userStore.findByUsername(data.username)) {
    throw new HttpError(409, "Benutzername ist schon vergeben");
  }
  return userStore.create(data);
}

export function update(id: number, data: CreateUserInput) {
  getById(id); // wirft 404, falls es den User nicht gibt

  // Name darf nur von einem anderen User nicht schon benutzt werden
  const sameName = userStore.findByUsername(data.username);
  if (sameName && sameName.id !== id) {
    throw new HttpError(409, "Benutzername ist schon vergeben");
  }
  return userStore.update(id, data);
}

export function remove(id: number) {
  getById(id);
  userStore.remove(id); // Noten werden per ON DELETE CASCADE mitgelöscht
}
