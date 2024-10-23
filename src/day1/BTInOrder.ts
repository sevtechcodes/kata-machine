function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
	if (!curr) {
		return path;
	}

	//recursion:
	//1.step Pre


	//2.step recurse
	walk(curr.left, path);
	path.push(curr.value); //this is where we visit the node
	walk(curr.right, path);

	//3.step post
	return path;
}


export default function in_order_search(head: BinaryNode<number>): number[] {
	return walk(head, []);
}