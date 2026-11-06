import { HttpError } from "../errors.js";

// Wandelt z.B. req.params.id ("3") in eine Zahl um.
// Alles, was keine positive ganze Zahl ist ("abc", "-1", "2.5"), ergibt 400.
export function parseId(value: unknown): number {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) {
    throw new HttpError(400, "Ungültige ID");
  }
  return id;
}
