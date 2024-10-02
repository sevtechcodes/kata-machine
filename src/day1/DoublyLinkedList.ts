import { unescapeLeadingUnderscores } from "typescript";

type Node<T> = {
	value: T,
	prev?: Node<T>,
	next?: Node<T>,
}

export default class DoublyLinkedList<T> {
	public length: number;
	private head?: Node<T>;
	private tail?: Node<T>;

	constructor() {
		this.length = 0;
		this.head = undefined;
		this.tail = undefined;
	}

	// Prepend an item to the beginning of the list
	prepend(item: T): void {
		const node = { value: item } as Node<T>;
		this.length++;
		if (!this.head) {
			this.head = this.tail = node;
			return;
		}

		node.next = this.head;
		this.head.prev = node;
		this.head = node;
	}

	// Insert an item at a specific index
	insertAt(item: T, idx: number): void {
		if (idx > this.length || idx < 0) {
			throw new Error('You are looking for an outside world :)');
		}

		if (idx === 0) {
			this.prepend(item); // Use prepend at index 0
			return;
		} else if (idx === this.length) {
			this.append(item); // Use append when adding to the end
			return;
		}

		this.length++;

		let curr = this.head;
		for (let i = 0; curr && i < idx; ++i) {
			curr = curr.next;
		}

		const node = { value: item } as Node<T>;
		node.next = curr; // Link new node to current node
		node.prev = curr!.prev;

		if (curr!.prev) {
			curr!.prev.next = node;
		}

		curr!.prev = node;

		// If inserting at the head, update the head reference
		if (idx === 0) {
			this.head = node;
		}
	}

	// Append an item to the end of the list
	append(item: T): void {
		this.length++;

		const node = { value: item } as Node<T>;
		if (!this.tail) {
			this.head = this.tail = node;
			return;
		}

		node.prev = this.tail;
		this.tail.next = node;
		this.tail = node;
	}

	// Remove an item by its value
	remove(item: T): T | undefined {
		let curr = this.head;
		while (curr && curr.value !== item) {
			curr = curr.next;
		}

		if (!curr) {
			// No item found to remove
			return undefined;
		}

		this.length--;

		if (curr.prev) {
			curr.prev.next = curr.next;
		} else {
			// If curr is the head, update head
			this.head = curr.next;
		}

		if (curr.next) {
			curr.next.prev = curr.prev;
		} else {
			// If curr is the tail, update tail
			this.tail = curr.prev;
		}

		curr.prev = curr.next = undefined;
		return curr.value;
	}

	// Get the value at a given index
	get(idx: number): T | undefined {
		return this.getAt(idx)?.value;
	}

	// Remove a node at a given index
	removeAt(idx: number): T | undefined {
		const node = this.getAt(idx);
		if (!node) {
			return undefined;
		}
		return this.removeNode(node);
	}

	// Private helper to remove a node
	private removeNode(node: Node<T>): T | undefined {
		this.length--;

		if (node.prev) {
			node.prev.next = node.next;
		} else {
			// If node is the head, update head
			this.head = node.next;
		}

		if (node.next) {
			node.next.prev = node.prev;
		} else {
			// If node is the tail, update tail
			this.tail = node.prev;
		}

		node.prev = node.next = undefined;
		return node.value;
	}

	// Helper to get a node at a specific index
	private getAt(idx: number): Node<T> | undefined {
		if (idx < 0 || idx >= this.length) {
			return undefined; // Return undefined if the index is out of bounds
		}

		let curr = this.head;
		for (let i = 0; curr && i < idx; ++i) {
			curr = curr.next;
		}
		return curr;
	}
}
