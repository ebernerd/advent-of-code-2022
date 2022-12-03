import { absModulo, readFileLinesToArray } from "../utils"
const lines = readFileLinesToArray(`${__dirname}/input.txt`)

/*
	A = rock	X = rock	X = lose
	B = paper	Y = paper	Y = draw
	C = scissor	Z = scissor	Z = win
*/

type OpponentPlay = "A" | "B" | "C"
type StratPlay = "X" | "Y" | "Z"
type OutcomeMap = {
	[opponent in OpponentPlay]: {
		[strat in StratPlay]: number
	}
}
//	Map for part 1
const outcomes: OutcomeMap = {
	A: {
		X: 3,
		Y: 6,
		Z: 0,
	},
	B: {
		X: 0,
		Y: 3,
		Z: 6,
	},
	C: {
		X: 6,
		Y: 0,
		Z: 3,
	},
}

const weights: { [weight in OpponentPlay | StratPlay]: number } = {
	A: 0,
	X: 0,

	B: 1,
	Y: 1,

	C: 2,
	Z: 2,
}
const stratWeightLookup: StratPlay[] = ["X", "Y", "Z"]

const instructions: { [instruction in StratPlay]: number } = {
	X: -1,
	Y: 0,
	Z: 1,
}

let part1Sum: number = 0
let part2Sum: number = 0
for (const line of lines) {
	const [opponent, strat] = line.split(" ") as [OpponentPlay, StratPlay]
	part1Sum += outcomes[opponent][strat] + (weights[strat] + 1)

	const oppPlayInt = weights[opponent]
	const idx = absModulo(oppPlayInt + instructions[strat], 3)
	const moveToPlay = stratWeightLookup[idx]
	part2Sum += outcomes[opponent][moveToPlay] + (weights[moveToPlay] + 1)
}

console.log(`Part 1: ${part1Sum}`)
console.log(`Part 2: ${part2Sum}`)
