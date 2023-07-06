export function debounce<T extends (...args: any) => any>(
  func: T,
  timeout: number
) {
  let timer: NodeJS.Timeout;

  const originFunc = (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };

  return originFunc as T;
}
