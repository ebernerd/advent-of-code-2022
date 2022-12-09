import { getPuzzleInputAsString } from "../utils"
const input = getPuzzleInputAsString(`${__dirname}/input.txt`)

//	For this implementation I'm not going for optimal, I'm going for JS syntax FUN!
//	View this program unfactored in its glory: https://imgur.com/ElAhCth

//	We can imagine the starting sequence "finder" as a section of the original input that slides across the input until
//	the letters within the finder are completely unique. My implementation creates an ordered array of the possible
//	combinations that finder could see, then use `findIndex` to find the first instance where the letters are unique
//	(which I learned is called a "heterogram" - https://en.wikipedia.org/wiki/Heterogram_(literature))
//
//	The correct answer is the position of the *end* of this sequence, so we add the window size at the end.

const getWindowIndices = (windowSize: number) =>
	Array.from(Array(input.length - windowSize + 1).keys())

const getWindow = (windowSize: number, i: number) =>
	input.slice(i, i + windowSize)

const isHeterogram = (str: string): boolean =>
	str.length === new Set(str.split("")).size

const getAnswer = (windowSize: number) =>
	getWindowIndices(windowSize)
		.map((i) => getWindow(windowSize, i))
		.findIndex(isHeterogram) + windowSize

console.log(`Part 1: ${getAnswer(4)}`)
console.log(`Part 2: ${getAnswer(14)}`)
