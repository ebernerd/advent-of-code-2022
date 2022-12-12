import { getPuzzleInputAsLines, clampValue } from "../utils"
const input = getPuzzleInputAsLines(`${__dirname}/input.txt`)

const seen: Set<string> = new Set(["0:0"])
const logPoint = (pos: Knot) => seen.add(`${pos.x}:${pos.y}`)

//	Essentially a doubly-linked list
class Knot {
	public x: number = 0
	public y: number = 0

	public ahead: Knot | undefined = undefined
	public behind: Knot | undefined = undefined

	public static createChain = (count: number) => {
		const head = new Knot()
		let ahead = head
		for (let i = 0; i < count; i++) {
			const knot = new Knot()
			knot.ahead = ahead
			ahead.behind = knot
			ahead = knot
		}
		return head
	}

	syncPosition = () => {
		const { ahead, behind } = this
		if (ahead) {
			//	Use the square assessment method to check if this point needs to move
			const oobX = ahead.x < this.x - 1 || ahead.x > this.x + 1
			const oobY = ahead.y < this.y - 1 || ahead.y > this.y + 1
			if (oobX || oobY) {
				//	This clamp method gets us the horizontal & vertical movement behavior set by the problem for free!
				const dx = clampValue(-1, ahead.x - this.x, 1)
				const dy = clampValue(-1, ahead.y - this.y, 1)
				this.x += dx
				this.y += dy
			}
		}

		//	Propegate the changes further down the chain
		if (behind) {
			behind.syncPosition()
		} else {
			logPoint(this)
		}
	}
}

const runProblem = (n: number): number => {
	const head = Knot.createChain(n)
	for (const command of input) {
		const split = command.split(" ")
		const dir = split[0]
		const amount = Number(split[1])
		for (let i = 0; i < amount; i++) {
			if (dir === "U" || dir === "D") {
				const move = dir === "U" ? -1 : 1
				head.y += move
			} else {
				const move = dir === "L" ? -1 : 1
				head.x += move
			}
			head.syncPosition()
		}
	}

	const answer = seen.size
	seen.clear()
	return answer
}

console.log(`Part 1: ${runProblem(1)}`)
console.log(`Part 2: ${runProblem(9)}`)
