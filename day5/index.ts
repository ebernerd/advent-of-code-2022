import { readFileLinesToArray } from "../utils"
const lines = readFileLinesToArray(`${__dirname}/input.txt`)

type Stack = string[]

const startInputRegex = /(?:\[([A-Z])\]\s*)/g
const instructionRegex = /^move ([0-9]+) from ([0-9]+) to ([0-9]+)$/

//	For this prompt, the starting program state takes up the first 8 lines of the input, then 2 lines that aren't needed
//	*then* the sequential stuff starts. To accomplish this, I will splice (pop off the front) 10 items from `lines`,
//	then only take the first 8 lines of that result, since the remaining 2 aren't necessary.
const startingStateInput: string[] = lines.splice(0, 10).slice(0, 8)

const stackSets: Stack[][] = Array.from(Array(2), () =>
	Array.from(Array(10), () => [])
)

for (const line of startingStateInput) {
	let match: RegExpExecArray | null
	while ((match = startInputRegex.exec(line)) !== null) {
		const targetStack = match.index / 4
		const itemInBox = match[1]
		stackSets.forEach((stacks) => stacks[targetStack].unshift(itemInBox))
	}
}

const moveItems = (
	stacks: Stack[],
	from: number,
	to: number,
	count: number,
	keepOrder: boolean
) => {
	const fromStack = stacks[from]
	const toStack = stacks[to]

	const inTransit = fromStack.splice(fromStack.length - count)
	if (!keepOrder) {
		inTransit.reverse()
	}

	toStack.push(...inTransit)
}

for (const line of lines) {
	const [instruction, ...rest] = instructionRegex.exec(line)! // I know the input is safe so don't bother w/ a check
	const [count, fromOBO, toOBO] = rest.map((v) => Number(v))

	moveItems(stackSets[0], fromOBO - 1, toOBO - 1, count, false)
	moveItems(stackSets[1], fromOBO - 1, toOBO - 1, count, true)
}

const getAnswer = (part: number) =>
	stackSets[part].map((stack) => stack[stack.length - 1]).join("")

console.log(`Part 1: ${getAnswer(0)}`)
console.log(`Part 2: ${getAnswer(1)}`)
