import { useState, useEffect, useRef } from 'react';
import { throttle } from './utils';

interface Options {
	root?: HTMLElement;
	rootMargin?: string;
	threshold?: number | number[];
}

const inViewportPolyfill = (
	element: HTMLElement,
	callback: (x: any) => void,
	options: Options
) => {
	const { root = document.documentElement } = options;
	const viewWidth = root.clientWidth;
	const viewHeight = root.clientHeight;

	const update = throttle(() => {
		const {
			width,
			height,
			top,
			bottom,
			left,
			right,
		} = element.getBoundingClientRect();

		callback(
			width &&
				height &&
				top < viewHeight &&
				bottom > 0 &&
				left < viewWidth &&
				right > 0
		);
	}, 250);

	document.addEventListener('scroll', update);
	return () => document.removeEventListener('scroll', update);
};

const useInViewport = (options: Options = {}) => {
	const [inViewport, setInViewport] = useState<boolean>(false);
	const ref = useRef<HTMLElement>();
	const { root, rootMargin = '0px', threshold = [0] } = options;

	useEffect(() => {
		let unobserve = () => {};

		if (window.IntersectionObserver) {
			const observer = new window.IntersectionObserver(
				([entry]) => {
					setInViewport(entry.isIntersecting);
				},
				{ root, rootMargin, threshold }
			);

			if (ref.current) {
				observer.observe(ref.current);
				unobserve = () => observer.unobserve(ref.current!);
			}
		} else {
			if (ref.current) {
				unobserve = inViewportPolyfill(ref.current, setInViewport, options);
			}
		}

		return unobserve;
	}, []);

	return [inViewport, ref];
};

export default useInViewport;
