export function sortBy<T, K extends keyof T>(items: T[], key: K, desc: boolean = false): T[] {
  const direction = desc ? -1 : 1;
  return [...items].sort((a: T, b: T): number => {
    let sortResult = 0;
    if (a[key] < b[key]) {
      sortResult = -1;
    }
    if (a[key] > b[key]) {
      sortResult = 1;
    }
    return sortResult * direction;
  });
}
