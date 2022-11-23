type DebouncedFunction<T extends (...args: any) => any> = (...args: Parameters<T>) => void;

export function debounce<T extends(...args: any) => any>(func: T, timeout: number): DebouncedFunction<T> {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
}
