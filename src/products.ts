import express, { Router, Request, Response } from 'express'
import { tools, Tool, ToolNoId, addTool } from './data/tools.js'

export const router: Router = express.Router()

// Gå direkt till endpoints (konfigurationen görs i server.ts)

// OBS! '/products' står i server.ts  (''/products' + '/')
router.get('/', (req: Request, res: Response) => {
	res.send(tools)
})

// Svara med utvalt objekt
interface IdParam {
	id: string;  // Alla URL-parametrar är strängar!
}
router.get('/:id', (req: Request<IdParam>, res: Response) => {
	// plocka ut ID från URL-parametrarna
	const id: number = Number( req.params.id )
	if( isNaN(id) || id < 0 ) {
		// BAD REQUEST of id-parametern är en sträng eller tal mindre än noll
		res.sendStatus(400)
		return   // Viktigt att avsluta - annars kör vi SEND en gång till
	}

	// Leta efter matchande objekt i listan
	const found: Tool | undefined = tools.find(tool => tool.id === id)
	if( found ) {
		// Skicka tillbaka det vi hittat
		res.send(found)
	} else {
		res.sendStatus(404)
	}
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
