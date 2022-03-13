export function flip(dir: string, arr: number[]): number[] {
  return arr.sort((a, b) => (dir === "L" ? b - a : a - b));
}
