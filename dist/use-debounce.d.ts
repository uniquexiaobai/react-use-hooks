declare type Fn = (...args: any) => any;
declare function useDebounce<T extends Fn>(func: T, delay: number): T;
export default useDebounce;
