import Joi from 'joi'
import { ToolNoId } from "./tools.js";

const toolNoIdSchema = Joi.defaults(schema => {
	return schema.required()
})
	.object({
		name: Joi.string()
			.min(1),
			// .required(),
		price: Joi.number()
			.min(0),
			// .required()
		category: Joi.string()
			.min(1)
	}
)

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
