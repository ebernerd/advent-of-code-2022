import { readFileLinesToArray, sumArray } from "../utils"
const lines = readFileLinesToArray(`${__dirname}/input.txt`)

type Elf = number[]
const elves: Elf[] = []
let elf: Elf = []
for (const line of lines) {
	if (line.length === 0) {
		elves.push(elf)
		elf = []
		continue
	}
	elf.push(Number(line))
}
elves.push(elf)

const sortedSums = elves.map((elf) => sumArray(elf)).sort((a, b) => b - a)

console.log(`Part 1: ${sortedSums[0]}`)
console.log(`Part 2: ${sumArray(sortedSums.slice(0, 3))}`)
