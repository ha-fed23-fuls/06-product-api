import Joi from 'joi'
import { ToolNoId } from "./tools.js";

const toolNoIdSchema = Joi.object({
		name: Joi.string()
			.min(1),
			// .required(),
		price: Joi.number()
			.min(0)
			.strict(),  // inte okej med strängar som innehåller nummer typ "42"
			// .required()
		category: Joi.string()
			.min(1)
	}
).required()

// Alternativt namn: isValidToolExceptId
export function isToolNoId(data: ToolNoId): boolean {
	let result = toolNoIdSchema.validate(data)
	return !result.error
	// Raden ovan gör samma sak
	// if( result.error ) {
	// 	return false
	// } else {
	// 	return true
	// }
}
