import { Request, Response, NextFunction } from 'express'

// Schreibt z.B.  "GET /login"  in die Konsole
export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`${req.method} ${req.url}`)
    next() // wichtig: weiter zur nächsten Station
}