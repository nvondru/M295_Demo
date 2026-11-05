import multer from 'multer'
import type { Request } from 'express'
import {HttpError} from "./errors.js";

// Erlaubte MIME-Typen -> sichere Dateiendung
const erlaubt: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'application/pdf': '.pdf',
}

function fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
) {
    if (erlaubt[file.mimetype]) cb(null, true)
    else cb(new HttpError(415,'Dateityp nicht erlaubt'))
}

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        // Eindeutiger Name + sichere Endung, abgeleitet aus dem geprüften Typ
        const endung = erlaubt[file.mimetype] ?? ''
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${endung}`)
    },
})

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // max. 2 MB
})