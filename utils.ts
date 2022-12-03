import { readFileSync } from "fs"

type ReadFileLinesToArrayOptions = {
	skipEmpty?: boolean
}
export const readFileLinesToArray = (
	filePath: string,
	options?: ReadFileLinesToArrayOptions
): string[] => {
	const buf = readFileSync(filePath)

	const contents = buf.toString("utf-8")

	let lines: string[] = contents.split("\n")
	if (options?.skipEmpty) {
		lines = lines.filter((str) => str.length > 0)
	}

	return lines
}

export const absModulo = (x: number, m: number) => ((x % m) + m) % m

export const sumArray = (arr: number[]) =>
	arr.reduce((sum, val) => sum + val, 0)
