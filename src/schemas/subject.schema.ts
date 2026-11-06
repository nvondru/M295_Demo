import { z } from 'zod'

export const createUserSchema = z.object({
    username: z.string().min(1, 'Pflichtfeld').max(100),
    password: z.string().min(4, 'mind. 4 Zeichen'),
})

// Passenden TypeScript-Typ automatisch ableiten
export type CreateUserInput = z.infer<typeof createUserSchema>