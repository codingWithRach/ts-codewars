export class G964 {
  public static partlist(arr: string[]): string[][] {
    return arr
      .map((element, index) => [
        arr.slice(0, index + 1).join(" "),
        arr.slice(index + 1).join(" "),
      ])
      .slice(0, -1);
  }
}
