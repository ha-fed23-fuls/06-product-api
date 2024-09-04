import express, { Router, Request, Response } from 'express'
import { tools, Tool, ToolNoId, addTool } from './data/tools.js'

export const router: Router = express.Router()

// Gå direkt till endpoints (konfigurationen görs i server.ts)

// OBS! '/products' står i server.ts  (''/products' + '/')
router.get('/', (req: Request, res: Response) => {
	res.send(tools)
})

// TODO:
// POST /products  <- lägga till en ny produkt, ha med BODY
router.post('/', (req: Request<void, void, ToolNoId>, res: Response) => {
	const newTool: ToolNoId = req.body
	// TODO: validera så vi vet att newTool är ett korrekt Tool-objekt
	// console.log('Body innehåller tool-objektet: ', newTool)
	addTool(newTool)
	res.sendStatus(201)
})

// DELETE /products/:id  <- ta bort produkt baserat på id-parametern
// PUT /products/:id  <- ha med BODY
