import { getPuzzleInputAsString } from "../utils"
import { Folder } from "./Folder"
const input = getPuzzleInputAsString(`${__dirname}/input.txt`)

const split = input
	.split("$")
	.slice(1)
	.map((cmd) => cmd.trim())

const rootFolder = new Folder("/")

let cwd = rootFolder

split
	.map((cmd) => cmd.split("\n"))
	.slice(1)
	.forEach(([command, ...results]) => {
		const [commandName, ...args] = command.split(" ")
		switch (commandName) {
			case "ls": {
				results.forEach((child) => {
					const [lead, name] = child.split(" ")
					if (lead === "dir") {
						cwd.createChild(name)
					} else {
						cwd.addToSize(Number(lead))
					}
				})
				break
			}
			case "cd": {
				const newPath = args[0]
				if (newPath == "..") {
					cwd = cwd.navUp()
				} else {
					cwd = cwd.navDown(newPath)!
				}
				break
			}
		}
	})

const SIZE_CAP = 100000
let smallFoldersSum: number = 0
rootFolder.traverse((folder) => {
	const size = folder.getTotalSize()
	if (size < SIZE_CAP) {
		smallFoldersSum += size
	}
})
console.log(`Part 1: ${smallFoldersSum}`)

const TOTAL = 70000000
const TARGET_UNUSED = 30000000
const currentSize = rootFolder.getTotalSize()
const currentUnused = TOTAL - currentSize
let smallest: number = currentSize

rootFolder.traverse((folder) => {
	const size = folder.getTotalSize()
	if (currentUnused + size >= TARGET_UNUSED) {
		smallest = Math.min(smallest, size)
	}
})

console.log(`Part 2: ${smallest}`)
