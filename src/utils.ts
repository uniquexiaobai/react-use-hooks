export const debounce = (func: () => any, wait: number) => {
	let timer: number;

	return (...args: []) => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = window.setTimeout(() => {
			func(...args);
		}, wait);
	};
};

export const throttle = (func: () => any, wait: number) => {
	let last: number, timer: number;

	return (...args: []) => {
		const now = Date.now();

		if (last && now - last < wait) {
			clearTimeout(timer);

			timer = window.setTimeout(() => {
				last = now;
				func(...args);
			}, wait);
		} else {
			last = now;
			func(...args);
		}
	};
};
