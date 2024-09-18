// Sudo code:
//[ 0, ...... , N] arr, we compare i with (i+1) to swap
// for i ...n
//	for j ... n-1-i 
//		if (arr[i]> arr[j]){ swap(i,j)}


export default function bubble_sort(arr: number[]): void {
	for (let i = 0; i < arr.length; ++i) {
		for (let j = 0; j < arr.length - 1 - i; ++j) {
			if (arr[j] > arr[j + 1]) {
				const temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
	}
}

