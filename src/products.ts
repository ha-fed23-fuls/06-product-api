import express, { Router, Request, Response } from 'express'
import { tools, Tool } from './data/tools.js'

export const router: Router = express.Router()

// Gå direkt till endpoints (konfigurationen görs i server.ts)

// OBS! '/products' står i server.ts  (''/products' + '/')
router.get('/', (req: Request, res: Response) => {
	res.send(tools)
})

// TODO:
// POST /products  <- lägga till en ny produkt, ha med BODY
// DELETE /products/:id  <- ta bort produkt baserat på id-parametern
// PUT /products/:id  <- ha med BODY
