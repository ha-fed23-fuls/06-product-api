export interface Tool {
	id: number;
	name: string;
	price: number;
	category: string;
}
export interface ToolNoId {
	name: string;
	price: number;
	category: string;
}

export const tools: Tool[] = [
	{ id: 1, name: "Hammare", price: 199, category: "Slagverktyg" },
	{ id: 2, name: "Skruvmejsel", price: 79, category: "Handverktyg" },
	{ id: 3, name: "Tång", price: 129, category: "Handverktyg" },
	{ id: 4, name: "Såg", price: 249, category: "Skärverktyg" },
	// { id: 5, name: "Skiftnyckel", price: 159, category: "Handverktyg" },
	// { id: 6, name: "Måttband", price: 89, category: "Mätverktyg" },
	// { id: 7, name: "Vattenpass", price: 99, category: "Mätverktyg" },
	// { id: 8, name: "Borrmaskin", price: 899, category: "Elverktyg" },
	// { id: 9, name: "Spikpistol", price: 1299, category: "Elverktyg" },
	// { id: 10, name: "Sandpapper", price: 29, category: "Slipverktyg" }
];

function generateId(): number {
	let max = 0
	tools.forEach(tool => {
		if( tool.id > max ) {
			max = tool.id
		}
	})
	return max + 1
}
export function addTool(newTool: ToolNoId): void {
	const tool: Tool = { ...newTool, id: generateId() }
	tools.push(tool)
}
