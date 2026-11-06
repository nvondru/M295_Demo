import { z } from 'zod'

// userId kommt aus der URL (/users/:userId/grades), nicht aus dem Body
export const createGradeSchema = z.object({
    value: z
        .number({
            error: (issue) => issue.input === undefined ? 'Pflichtfeld' : 'Muss eine Zahl sein',
        })
        .min(1, 'Note muss mindestens 1 sein')
        .max(6, 'Note darf höchstens 6 sein'),
    subjectId: z.int('Pflichtfeld'),
})

// Passenden TypeScript-Typ automatisch ableiten
export type CreateGradeInput = z.infer<typeof createGradeSchema>
