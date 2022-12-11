import { getPuzzleInputAsLines } from "../utils"
const input = getPuzzleInputAsLines(`${__dirname}/input.txt`)

class Position {
	public x: number
	public y: number

	constructor(x: number = 0, y: number = x) {
		this.x = x
		this.y = y
	}
}

let head = new Position()
let tail = new Position()

const seen: number[][] = []

for (const command of input) {
	const split = command.split(" ")
	const dir = split[0]
	const amount = Number(split[1])

	if (dir === "U" || dir === "D") {
		const delta = amount * (dir === "U" ? -1 : 1)
		head.y += delta
	} else {
		const delta = amount * (dir === "L" ? -1 : 1)
		head.x += delta
	}

	//	Assess tail
	const xDelta = head.x - tail.x
	const yDelta = head.y - tail.y

	const needsMove = Math.abs(xDelta) > 1 || Math.abs(yDelta) > 1
	if (needsMove) {
		tail.x += xDelta
		tail.y += yDelta

		seen[tail.y] = seen[tail.y] ?? []
		seen[tail.y].push(tail.x)
	}
}

const total = seen.reduce((sum, arr) => sum + arr.length, 0)
console.log(total)
