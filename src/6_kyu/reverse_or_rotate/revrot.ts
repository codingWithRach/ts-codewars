export class G964 {
  public static revrot(str: string, sz: number) {
    let result: string = "";
    if (sz > 0) {
      for (let i = sz; i <= str.length; i += sz) {
        const chunk: Array<string> = [...str.substring(i - sz, i)];
        const chunkCubed: number = chunk
          .map((num) => Math.pow(Number(num), 3))
          .reduce((a, b) => a + b);
        result +=
          chunkCubed % 2
            ? chunk.slice(1).concat(chunk[0]).join("")
            : chunk.reverse().join("");
      }
    }
    return result;
  }
}
