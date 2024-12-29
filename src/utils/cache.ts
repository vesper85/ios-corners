export function createMemoryCache<T extends (...args: any[]) => any>(
  getter: T,
  argsSerializer: (...args: Parameters<T>) => string
): T {
  const cacheMap = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const serializedArgs = argsSerializer(...args);
    const cachedValue = cacheMap.get(serializedArgs);

    if (cachedValue) {
      return cachedValue;
    }

    const newValue = getter(...args);
    cacheMap.set(serializedArgs, newValue);
    return newValue;
  }) as T;
}
