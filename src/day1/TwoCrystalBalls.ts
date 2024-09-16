//The two crystal ball problem: 
// Given two crystal balls that will breat if dropped from high enogh distance,
// determince the exact stop in which it will break in the most optimized way.
//[0, 0, 0 ....., 1,1,1,1]; //when we meet break
//we need generalize it and jum here by sqrt(N) amount. We choose sqrt just to get a sub linear. something better linear. Still we dont get LogN but it is better than Linear.

export default function two_crystal_balls(breaks: boolean[]): number {

	const jmpAmount = Math.floor(Math.sqrt(breaks.length));
	let i = jmpAmount;
	for (; i < breaks.length; i += jmpAmount) {
		if (breaks[i]) {
			break;
		}
	}

	i -= jmpAmount;

	for (let j = 0; j <= jmpAmount && i < breaks.length; j++, i++) {
		if (breaks[i]) {
			return i;
		}
	}

	return -1;
}

//Big-O => O(sqrt(N))