export function warnTheSheep(queue: string[]): string {
  const wolfPos = queue.reverse().indexOf("wolf");
  return wolfPos === 0
    ? "Pls go away and stop eating my sheep"
    : `Oi! Sheep number ${wolfPos}! You are about to be eaten by a wolf!`;
}
