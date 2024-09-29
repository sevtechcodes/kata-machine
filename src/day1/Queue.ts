type Node<T> = {
	value: T,
	next?: Node<T>,
}

export default class Queue<T> {
	public length: number;
	private head?: Node<T>;
	private tail?: Node<T>;

	constructor() {
		this.head = this.tail = undefined;
		this.length = 0;
	}

	//adding a node to the end of the queue
	enqueue(item: T): void {
		const node = { value: item } as Node<T>;
		this.length++;
		if (!this.tail || !this.head) {
			this.tail = this.head = node;
			return;
		}
		this.tail.next = node;
		this.tail = node;

	}

	//removing a node from the begining of the queue
	deque(): T | undefined {
		if (!this.head) {
			return undefined;
		}

		this.length--;

		const head = this.head;
		this.head = this.head.next;

		//Optional: The JS garbage collector will take care of this part so actually we do not need to do this.
		head.next = undefined;

		if (this.length === 0) {
			this.tail = undefined;
		}

		return head.value;
	}

	// Peek at the front value without removing it
	peek(): T | undefined {
		return this.head?.value;
	}
}