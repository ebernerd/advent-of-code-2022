export class Folder {
	private children: Folder[]
	private size: number
	private name: string
	protected parent: Folder | null = null

	constructor(name: string) {
		this.children = []
		this.size = 0
		this.name = name
	}

	addToSize = (sz: number) => (this.size += sz)

	createChild = (name: string) => {
		const child = new Folder(name)
		child.parent = this
		this.children.push(child)
		return child
	}

	navUp = () => this.parent ?? this
	navDown = (name: string) =>
		this.children.find((child) => child.name === name)

	getTotalSize = (): number =>
		this.size +
		this.children.reduce((sum, child) => sum + child.getTotalSize(), 0)

	traverse = (callback: (child: Folder) => any) => {
		callback(this)
		this.children.forEach((folder) => {
			folder.traverse(callback)
		})
	}
}
