import express, { Router, Request, Response } from 'express'
import { tools, Tool, ToolNoId, addTool } from './data/tools.js'
import { isToolNoId } from './data/validation.js'

export const router: Router = express.Router()
// Gå direkt till endpoints (konfigurationen görs i server.ts)


// Interface som används i filen
interface IdParam {
	id: string;  // Alla URL-parametrar är strängar!
}



// OBS! '/products' står i server.ts  (''/products' + '/')
router.get('/', (req: Request, res: Response) => {
	res.send(tools)
})

// Svara med utvalt objekt
router.get('/:id', (req: Request<IdParam>, res: Response) => {
	// plocka ut ID från URL-parametrarna
	const id: number = Number( req.params.id )
	if( !isValidId(id) ) {
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

// POST /products  <- lägga till en ny produkt, ha med BODY
router.post('/', (req: Request<void, void, ToolNoId>, res: Response) => {
	const newTool: ToolNoId = req.body
	// Validera så vi vet att newTool är ett korrekt Tool-objekt
	if( !isToolNoId(newTool) ) {
		res.sendStatus(400)  // Felaktigt objekt == 400 Bad request
		return
	}
	// console.log('Body innehåller tool-objektet: ', newTool)
	addTool(newTool)
	res.sendStatus(201)
})

// PUT /products/:id  <- ha med BODY
router.put('/:id', (req: Request<IdParam, void, ToolNoId>, res: Response) => {
	// plocka ut id ur URL-param-objektet
	// validera body, måste vara ett korrekt ToolNoId-objekt
	// hitta index i listan för objektet som ska ändras
	// byt ut objektet på indexet i listan mot det nya objektet
	// skicka tillbaka statuskod

	const id: number = Number(req.params.id)
	if( !isValidId(id) ) {
		res.sendStatus(400)  // Felaktigt id == 400 Bad request
		return
	}

	const newTool: ToolNoId = req.body
	console.log('typeof price: ' + (typeof newTool.price))
	if( !isToolNoId(newTool) ) {
		res.sendStatus(400)  // Felaktigt objekt == 400 Bad request
		return
	}

	const index: number = tools.findIndex(tool => tool.id === id)
	if( index === -1 ) {
		res.sendStatus(404)  // Hittade inget objekt med samma id == 404 Not found
		return
	}

	tools[index] = { ...newTool, id: id }
	res.sendStatus(204)
})


// TODO
// DELETE /products/:id  <- ta bort produkt baserat på id-parametern




// Hjälpfunktioner
function isValidId(maybeId: number): boolean {
	return !isNaN(maybeId) && maybeId >= 0
}
