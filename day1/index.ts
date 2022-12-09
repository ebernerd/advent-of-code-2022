import { getPuzzleInputAsLines, sumArray } from "../utils"
const lines = getPuzzleInputAsLines(`${__dirname}/input.txt`)

//	Each elf in this problem is just a collection of calories. The `elf` var is a working stack of numbers that gets
//	committed to the list of elves when the line reader hits an empty line
type Elf = number[]

const elves: Elf[] = []
let elf: Elf = []

for (const line of lines) {
	if (line.length === 0) {
		elves.push(elf)
		elf = []
	} else {
		elf.push(Number(line))
	}
}

//	In the event the input file doesn't end with a newline, we must push the final elf into the stack manually
if (elf.length > 0) {
	elves.push(elf)
}

//	Sum all the elves together to get their calorie count. Sorting the results descending makes printing both answers
//	pretty easy
const sortedSums = elves.map((elf) => sumArray(elf)).sort((a, b) => b - a)

console.log(`Part 1: ${sortedSums[0]}`)
console.log(`Part 2: ${sumArray(sortedSums.slice(0, 3))}`)
