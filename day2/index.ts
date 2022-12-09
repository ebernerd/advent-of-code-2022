import { absModulo, getPuzzleInputAsLines } from "../utils"
const lines = getPuzzleInputAsLines(`${__dirname}/input.txt`)

type OpponentPlay = "A" | "B" | "C"
type StratPlay = "X" | "Y" | "Z"
type OutcomeMap = {
	[opponent in OpponentPlay]: {
		[strat in StratPlay]: number
	}
}
type InstructionMap = { [instruction in StratPlay]: number }

//	This map uses the opponent play keys and maps them to our strategic play keys. The number is the correlated score
//	based on the win/loss of the combined keys.
//	Example: A Y = opponent rock, player paper. Player wins, so 6 points. Therefore, outcomeMap["A"]["Y"] = 6
const outcomeMap: OutcomeMap = {
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

//	Instruction map tells us how many indices we need to move (positive or negative) in the respective order. We can
//	think of the rock/paper/scissors game as a looping array, since P beats R beats S beats P beats R ...
//	This means that for a draw, we must play the same index in the array. If we order the array "rock/paper/scissors",
//	any move's nemesis is one index ahead, and it's prey is one index behind. Thus, for us to lose, we must choose the
//	item one index behind what the index of the move the opponent is playing.
const instructionMap: InstructionMap = {
	X: -1,
	Y: 0,
	Z: 1,
}

const stratLookup: StratPlay[] = ["X", "Y", "Z"]
const oppLookup: OpponentPlay[] = ["A", "B", "C"]

let part1Sum: number = 0
let part2Sum: number = 0
for (const line of lines) {
	const [opponent, strat] = line.split(" ") as [OpponentPlay, StratPlay]
	part1Sum += outcomeMap[opponent][strat] + (stratLookup.indexOf(strat) + 1)

	const oppPlayIdx = oppLookup.indexOf(opponent)
	const stratPlayIdx = absModulo(oppPlayIdx + instructionMap[strat], 3)
	const instructedStrat = stratLookup[stratPlayIdx]
	part2Sum += outcomeMap[opponent][instructedStrat] + (stratPlayIdx + 1)
}

console.log(`Part 1: ${part1Sum}`)
console.log(`Part 2: ${part2Sum}`)
