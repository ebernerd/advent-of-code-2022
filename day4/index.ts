import { getPuzzleInputAsLines } from "../utils"
const lines = getPuzzleInputAsLines(`${__dirname}/input.txt`)

type Range = [min: number, max: number]

//	Checks if the entirety of the `needle` range exists within the `haystack` range
const isRangeInsideRange = (needle: Range, haystack: Range) =>
	needle[0] >= haystack[0] && needle[1] <= haystack[1]

//	Checks if either of the given ranges contains the other in its entirety
const checkForWholeOverlap = (range1: Range, range2: Range) =>
	isRangeInsideRange(range1, range2) || isRangeInsideRange(range2, range1)

//	Checks if any part of one range is inside of the other
const checkForPartialOverlap = (range1: Range, range2: Range) =>
	range1[1] >= range2[0] && range2[1] >= range1[0]

let p1sum: number = 0
let p2sum: number = 0
for (const line of lines) {
	const [range1, range2] = line
		//	Split each range of sections into separate itmes
		.split(",")
		//	Then convert that range into a Range object by separating the numbers (by splitting on "-") then converting
		//	the strings numbers.
		.map((elf) => elf.split("-").map((v) => Number(v)) as Range)

	p1sum += checkForWholeOverlap(range1, range2) ? 1 : 0
	p2sum += checkForPartialOverlap(range1, range2) ? 1 : 0
}

console.log(`Part 1: ${p1sum}`)
console.log(`Part 2: ${p2sum}`)
