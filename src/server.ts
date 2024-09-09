// Konfiguration + imports
import express, { Express, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { router } from './products.js'
const app: Express = express()
const port = 1338


// Middleware
app.use( cors() )  // öppna API:et för resten av världen
app.use( express.json() )  // lägger saker i req.body

app.use('/', (req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method}  ${req.url} `, req.body)
	next()
})

// Statiska filer
app.use( express.static('./frontend') )

// Endpoints - importeras från separata filer!
app.use('/products', router)


// Starta servern
app.listen(port, () => {
	console.log('Product API server is online on port ' + port)
})
