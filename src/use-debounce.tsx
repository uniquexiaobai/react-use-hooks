import { useRef } from 'react';

type Fn = (...args: any) => any;

function useDebounce<T extends Fn>(func: T, delay: number): T {
	const timerRef = useRef<number | null>(null);

	const debounced = (...args: any) => {
		if (timerRef.current) {
			window.clearTimeout(timerRef.current);
		}

		timerRef.current = window.setTimeout(() => {
			func(...args);
		}, delay);
	};

	return debounced as T;
}

export default useDebounce;
