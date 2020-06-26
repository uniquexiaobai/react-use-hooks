import { useRef } from 'react';

type Fn = (...args: any) => any;

function useThrottle<T extends Fn>(func: T, delay: number): T {
	const lastTimeRef = useRef<number>(Date.now());
	const timerRef = useRef<number | null>(null);

	const throttled = (...args: any) => {
		if (Date.now() - lastTimeRef.current < delay) {
			if (timerRef.current) {
				window.clearTimeout(timerRef.current);
			}

			timerRef.current = window.setTimeout(() => {
				func(...args);
				lastTimeRef.current = Date.now();
			}, delay);
		} else {
			func(...args);
			lastTimeRef.current = Date.now();
		}
	};

	return throttled as T;
}

export default useThrottle;
