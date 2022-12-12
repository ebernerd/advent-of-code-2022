import { readFileSync } from "fs"

export const getPuzzleInputAsString = (filePath: string) => {
	const buf = readFileSync(filePath)
	const contents = buf.toString("utf-8")
	return contents
}

export const getPuzzleInputAsLines = (filePath: string): string[] => {
	const contents = getPuzzleInputAsString(filePath)
	let lines: string[] = contents.split("\n")
	return lines
}

export const clampValue = (min: number, value: number, max: number) =>
	Math.min(Math.max(value, min), max)

export const absModulo = (x: number, m: number) => ((x % m) + m) % m

export const sumArray = (arr: number[]) =>
	arr.reduce((sum, val) => sum + val, 0)
