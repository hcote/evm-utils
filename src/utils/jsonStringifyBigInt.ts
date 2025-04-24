export function jsonStringifyBigInt<T>(obj: T): T {
    return JSON.parse(
      JSON.stringify(obj, (_, val) =>
        typeof val === "bigint" ? val.toString() : val
      )
    );
  }
  