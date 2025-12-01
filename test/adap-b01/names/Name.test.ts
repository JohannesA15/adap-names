import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

  it("should initialize with default delimiter", () => {
    const n = new Name(["a", "b", "c"]);
    expect(n.asString()).toBe("a.b.c");
    expect(n.getNoComponents()).toBe(3);
  });

  it("should initialize with custom delimiter", () => {
    const n = new Name(["x", "y", "z"], "/");
    expect(n.asString()).toBe("x/y/z");
  });

  it("should handle empty components", () => {
    const n = new Name(["", "", ""], "/");
    expect(n.asString()).toBe("//");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], "#");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], "#");
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Mutation methods", () => {
  it("should insert at valid index", () => {
    const n = new Name(["a", "c"]);
    n.insert(1, "b");
    expect(n.asString()).toBe("a.b.c");
  });

  it("should throw when inserting at invalid index", () => {
    const n = new Name(["a", "b"]);
    expect(() => n.insert(5, "x")).toThrow(RangeError);
  });

  it("should append a component", () => {
    const n = new Name(["a", "b"]);
    n.append("c");
    expect(n.asString()).toBe("a.b.c");
  });

  it("should remove a component", () => {
    const n = new Name(["a", "b", "c"]);
    n.remove(1);
    expect(n.asString()).toBe("a.c");
  });

  it("should throw when removing invalid index", () => {
    const n = new Name(["a"]);
    expect(() => n.remove(2)).toThrow(RangeError);
  });

  it("should set a component value", () => {
    const n = new Name(["a", "b", "c"]);
    n.setComponent(1, "beta");
    expect(n.asString()).toBe("a.beta.c");
  });

  it("should throw when setting invalid index", () => {
    const n = new Name(["a"]);
    expect(() => n.setComponent(5, "b")).toThrow(RangeError);
  });
});

describe("Escape and data string behavior", () => {
  it("should correctly escape delimiters and escape characters", () => {
    const n = new Name(["a.b", "c\\d"]);
    // asDataString() should escape "." and "\"
    expect(n.asDataString()).toBe("a\\.b.c\\\\d");
  });

  it("should remain readable in asString()", () => {
    const n = new Name(["a.b", "c\\d"]);
    // Human-readable: not escaped, current delimiter is "."
    expect(n.asString()).toBe("a.b.c\\d");
  });

  it("should use custom delimiter for human-readable form", () => {
    const n = new Name(["hello", "world"], "#");
    expect(n.asString()).toBe("hello#world");
  });
});

describe("Complex name manipulations", () => {
  it("should handle names with multiple empty parts", () => {
    const n = new Name(["", "a", "", "b"], ".");
    expect(n.asString()).toBe(".a..b");
  });

  it("should reflect changes in component count", () => {
    const n = new Name(["x", "y"]);
    expect(n.getNoComponents()).toBe(2);
    n.append("z");
    expect(n.getNoComponents()).toBe(3);
  });

  it("should not affect original components when cloned externally", () => {
    const arr = ["one", "two"];
    const n = new Name(arr);
    arr.push("three");
    expect(n.asString()).toBe("one.two"); // defensive copy confirmed
  });
});

describe("Error checks", () => {
  it("test insert index error", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    expect(() => n.insert(-1, "cs")).toThrowError("Invalid index value");
    expect(() => n.insert(4, "cs")).toThrowError("Invalid index value");
    expect(() => n.insert(3, "cs")).not.toThrowError("Invalid index value");
  });
  it("test index error for other functions (get, set, remove)", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(() => n.getComponent(-1)).toThrowError("Invalid index value");
    expect(() => n.getComponent(4)).toThrowError("Invalid index value");
    expect(() => n.setComponent(-1, "Hallo Welt")).toThrowError(
      "Invalid index value"
    );
    expect(() => n.setComponent(4, "Hallo Welt")).toThrowError(
      "Invalid index value"
    );
    expect(() => n.remove(-1)).toThrowError("Invalid index value");
    expect(() => n.remove(4)).toThrowError("Invalid index value");
  });
});
