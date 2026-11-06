import { z } from 'zod'

// imagePath kommt von Multer (req.file.filename), nicht vom Client
export const createSubjectSchema = z.object({
    title: z.string('Pflichtfeld').min(5, 'mind. 5 Zeichen').max(100, 'max. 100 Zeichen'),
    imagePath: z.string('Bild fehlt').max(200, 'max. 200 Zeichen'),
    description: z.string('Pflichtfeld').max(500, 'max. 500 Zeichen'),
})

// Beim Ändern ist ein neues Bild optional (sonst bleibt das alte)
export const updateSubjectSchema = createSubjectSchema.partial({ imagePath: true })

// Passende TypeScript-Typen automatisch ableiten
export type CreateSubjectInput = z.infer<typeof createSubjectSchema>
export type UpdateSubjectInput = z.infer<typeof updateSubjectSchema>
