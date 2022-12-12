import { getPuzzleInputAsLines, clampValue } from "../utils"
const input = getPuzzleInputAsLines(`${__dirname}/input.txt`)

type Cycle =
	| {
			type: "sleep"
	  }
	| {
			type: "add"
			value: number
	  }

const program: Cycle[] = []

for (const command of input) {
	const [name, ...args] = command
		.split(" ")
		.map((val) => val.trim())
		.filter((val) => val.length > 0)

	if (name === "noop") {
		program.push({ type: "sleep" })
	} else if (name === "addx") {
		const value = Number(args[0])
		program.push({ type: "sleep" })
		program.push({
			type: "add",
			value,
		})
	}
}

let PC: number = 0
let X: number = 1

let p1sum: number = 0
let p2spritebuf: string[] = Array(3).fill("X").concat(Array(37).fill(" "))
let p2crt: string[] = Array(6).fill("")

for (const cycle of program) {
	PC += 1

	const signal = PC * X
	if ([20, 60, 100, 140, 180, 220].includes(PC)) {
		p1sum += signal
	}

	const cx = (PC - 1) % 40
	const cy = Math.floor((PC - 1) / 40)
	p2crt[cy] += p2spritebuf[cx] ?? " "

	switch (cycle.type) {
		default:
		case "sleep": {
			break
		}
		case "add": {
			X += cycle.value

			for (let i = 0; i < 40; i++) {
				p2spritebuf[i] = i >= X - 1 && i <= X + 1 ? "X" : " "
			}
		}
	}

	console.log(
		`${PC} (${[cy + 1]})\t(${cycle.type})\tX=${X}\t|${p2spritebuf.join(
			""
		)}|`
	)
}

console.log(`\nPart 1: ${p1sum}`)
console.log(`\nPart 2: \n${p2crt.join("\n")}\n`)
