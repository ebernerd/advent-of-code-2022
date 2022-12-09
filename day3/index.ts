import { getPuzzleInputAsLines } from "../utils"
const lines = getPuzzleInputAsLines(`${__dirname}/input.txt`)

const getCharScore = (char: string) => {
	const UPPER_OFFSET = 38
	const LOWER_OFFSET = 96

	const charCode = char.charCodeAt(0)
	return charCode - (charCode <= 90 ? UPPER_OFFSET : LOWER_OFFSET)
}

const getCharArray = (str: string): string[] => [...str]

const getDupedChar = ([base, ...rest]: string[][]): string =>
	base.filter((char) => rest.every((chars) => chars.includes(char)))[0]

const part1 = (): number => {
	let sum: number = 0
	for (const line of lines) {
		const halfIdx = line.length / 2
		const firstHalfChars = getCharArray(line.substring(0, halfIdx))
		const secondHalfChars = getCharArray(line.substring(halfIdx))
		const dupedChar = getDupedChar([firstHalfChars, secondHalfChars])
		sum += getCharScore(dupedChar)
	}

	return sum
}

const part2 = (): number => {
	let sum: number = 0
	for (let i = 0; i < lines.length; i += 3) {
		const chunk = lines.slice(i, i + 3)
		const charArrs = chunk.map((line) => getCharArray(line))
		const dupedChar = getDupedChar(charArrs)
		sum += getCharScore(dupedChar)
	}

	return sum
}

const part1Ans = part1()
const part2Ans = part2()

console.log(`Part 1: ${part1Ans}`)
console.log(`Part 2: ${part2Ans}`)
