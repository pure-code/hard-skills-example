type ThrottledFunction<T extends (...args: any) => any> = (
  ...args: Parameters<T>
) => void;

export function throttle<T extends (...args: any) => any>(
  func: T,
  limit: number
): ThrottledFunction<T> {
  let isThrottled: boolean;

  return (...args: any[]): void => {
    if (!isThrottled) {
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, limit);
      func(...args);
    }
  };
}
