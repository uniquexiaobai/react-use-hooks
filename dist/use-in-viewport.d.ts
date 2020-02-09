/// <reference types="react" />
interface Options {
    root?: HTMLElement;
    rootMargin?: string;
    threshold?: number | number[];
}
declare const useInViewport: (options?: Options) => (boolean | import("react").MutableRefObject<HTMLElement | undefined>)[];
export default useInViewport;
