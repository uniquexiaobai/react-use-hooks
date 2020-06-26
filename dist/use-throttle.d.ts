declare type Fn = (...args: any) => any;
declare function useThrottle<T extends Fn>(func: T, delay: number): T;
export default useThrottle;
